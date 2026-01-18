import re

file_path = r'C:\Users\hirok\.gemini\antigravity\scratch\english-textbook-vocab\data.js'

def read_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.readlines()

def find_array_bounds(lines, key_line_pattern):
    start_index = -1
    for i, line in enumerate(lines):
        if re.search(key_line_pattern, line):
            start_index = i
            break
    
    if start_index == -1:
        return None, None

    # Find the opening bracket of the array
    array_open_index = -1
    for i in range(start_index, len(lines)):
        if '[' in lines[i]:
            array_open_index = i
            break
            
    if array_open_index == -1:
        return None, None
        
    # Find closing bracket
    balance = 0
    array_close_index = -1
    for i in range(array_open_index, len(lines)):
        line = lines[i]
        
        # Simple counting, might be fooled by comments/strings but usually ok for formatted code
        # We need to be careful not to count brackets in comments
        # Strip comments for counting
        clean_line = re.sub(r'//.*', '', line)
        clean_line = re.sub(r'/\*.*?\*/', '', clean_line) 
        
        balance += clean_line.count('[')
        balance -= clean_line.count(']')
        
        if balance == 0:
            array_close_index = i
            break
            
    return array_open_index, array_close_index

def parse_lessons(lines):
    lessons = []
    current_lesson = []
    balance = 0
    in_lesson = False
    
    for line in lines:
        stripped = line.strip()
        if not stripped:
            continue
            
        clean_line = re.sub(r'//.*', '', line)
        # simplistic comment removal
        
        if not in_lesson:
            if '{' in clean_line:
                in_lesson = True
                current_lesson.append(line)
                balance += clean_line.count('{')
                balance -= clean_line.count('}')
                if balance == 0:
                     lessons.append("".join(current_lesson))
                     current_lesson = []
                     in_lesson = False
        else:
            current_lesson.append(line)
            balance += clean_line.count('{')
            balance -= clean_line.count('}')
            if balance == 0:
                lessons.append("".join(current_lesson))
                current_lesson = []
                in_lesson = False
                
    return lessons

def get_lesson_info(lesson_str):
    unit_match = re.search(r'"unit":\s*"([^"]+)"', lesson_str)
    pages_match = re.search(r'"pages":\s*"([^"]+)"', lesson_str)
    words_match = re.search(r'"words":\s*\[(.*?)\]', lesson_str, re.DOTALL)
    
    unit = unit_match.group(1) if unit_match else ""
    pages = pages_match.group(1) if pages_match else ""
    has_words = bool(words_match and words_match.group(1).strip())
    
    return unit, pages, has_words

def process():
    lines = read_file(file_path)
    
    # Locate "new_crown" -> "2" and "3"
    # Assuming standard formatting as seen in view_file
    
    # Locate "2": [
    g2_start, g2_end = find_array_bounds(lines, r'"2":\s*\[')
    g3_start, g3_end = find_array_bounds(lines, r'"3":\s*\[')
    
    if g2_start is None or g3_start is None:
        print("Could not find Grade 2 or Grade 3 arrays.")
        return

    print(f"Grade 2 Array: Lines {g2_start+1}-{g2_end+1}")
    print(f"Grade 3 Array: Lines {g3_start+1}-{g3_end+1}")

    g2_content = lines[g2_start+1:g2_end]
    g3_content = lines[g3_start+1:g3_end]
    
    g2_lessons_raw = parse_lessons(g2_content)
    g3_lessons_raw = parse_lessons(g3_content)
    
    all_lessons = []
    
    # Add existing Grade 3 lessons
    for l in g3_lessons_raw:
        # cleanup comma at end if present
        clean_l = l.strip().rstrip(',')
        all_lessons.append(clean_l)
        
    # Process Grade 2 lessons to find misplaced Grade 3 ones
    for l in g2_lessons_raw:
        unit, pages, has_words = get_lesson_info(l)
        clean_l = l.strip().rstrip(',')
        
        print(f"Found in Grade 2: {unit} ({pages}) Words: {has_words}")
        
        # Filter Logic:
        # We want Lessons 4, 5, 6, 7, 8 for Grade 3.
        # Check for empty Lesson 5 (P57-68) -> Skip
        # Check for duplicate Lesson 6 (P69-79) -> Skip if we have better one?
        # Actually, let's look at the specific attributes
        
        if unit == "Lesson 4":
            all_lessons.append(clean_l)
        elif unit == "Lesson 5":
            if "P57〜68" in pages and not has_words:
                print("Skipping empty Lesson 5")
                continue
            all_lessons.append(clean_l)
        elif unit == "Lesson 6":
            if "P69〜79" in pages:
                 print("Skipping partial/old Lesson 6 (P69-79)")
                 continue
            all_lessons.append(clean_l)
        elif unit == "Lesson 7":
            all_lessons.append(clean_l)
        elif unit == "Lesson 8":
            all_lessons.append(clean_l)
        else:
            print(f"Unknown unit in Grade 2: {unit}. Keeping it? No, assume it's garbage or old G2.")
            # If it's real Grade 2 (unlikely based on my analysis), we might lose it. 
            # But the prompt implies I need to fix the mess I made.
            pass

    # Sort lessons by Lesson number just in case
    # Lesson 1, Lesson 2, ...
    def sort_key(lesson_str):
        unit, _, _ = get_lesson_info(lesson_str)
        num = re.search(r'\d+', unit)
        return int(num.group(0)) if num else 999
        
    all_lessons.sort(key=sort_key)
    
    # Reconstruct the file
    # We will clear Grade 2 and populate Grade 3
    
    new_g3_content = "\n" + ",\n".join(all_lessons) + "\n"
    
    # We reconstruct the file by parts
    # Part 1: Start to g2_start
    # Part 2: "2": [],
    # Part 3: g2_end+1 to g3_start+1
    # Part 4: content of g3
    # Part 5: g3_end to end
    
    # Wait, indices are tricky.
    # header: lines[:g2_start+1] -> includes "2": [
    # But we want to empty it.
    
    # Let's verify overlap. G2 comes before G3.
    
    final_lines = []
    final_lines.extend(lines[:g2_start+1]) # Up to "2": [
    final_lines.append("\n        ],\n") # Empty Grade 2
    
    # Middle part: After G2 end, up to G3 start
    # g2_end is the line with "]"
    
    # If there is stuff between g2_end and g3_start?
    # Usually: "2": [ ... ], \n "3": [
    
    final_lines.extend(lines[g2_end+1 : g3_start+1]) # Includes "3": [
    
    final_lines.append(new_g3_content)
    
    final_lines.extend(lines[g3_end:]) # Closing bracket of G3 and rest
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(final_lines)
    
    print("Successfully reorganized data.js")

if __name__ == '__main__':
    try:
        process()
    except Exception as e:
        import traceback
        traceback.print_exc()
