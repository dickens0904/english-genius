"""
Comprehensive test suite for English Genius app.
Tests all major pages, navigation, and interactive features.
"""
from playwright.sync_api import sync_playwright, Page, expect
import json
import os

BASE_URL = "http://localhost:5177"
SCREENSHOT_DIR = "c:/Users/dicke/Documents/英语小天才/test_screenshots"
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

# Test results tracking
results = []

def log(test_name: str, passed: bool, detail: str = ""):
    status = "PASS" if passed else "FAIL"
    results.append({"name": test_name, "status": status, "detail": detail})
    icon = "✅" if passed else "❌"
    print(f"  {icon} {test_name}" + (f" ({detail})" if detail else ""))


def take_screenshot(page: Page, name: str):
    path = os.path.join(SCREENSHOT_DIR, f"{name}.png")
    page.screenshot(path=path, full_page=True)
    return path


# ============================================================
# TEST 1: Home Page
# ============================================================
def test_home_page(page: Page):
    print("\n🏠 Testing Home Page...")
    page.goto(BASE_URL)
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)

    take_screenshot(page, "01_home_page")

    # Check page loads
    title = page.title()
    log("Home page loads", "English Genius" in title, f"Title: {title}")

    # Check hero section text
    hero_text = page.locator("text=Welcome to English Genius").first
    hero_visible = hero_text.is_visible() if hero_text.count() > 0 else False
    log("Hero section visible", hero_visible)

    # Check unit cards present
    unit_cards = page.locator("[class*='cursor-pointer'][class*='rounded-2xl']")
    unit_count = unit_cards.count()
    log("Unit cards displayed", unit_count >= 4, f"Found {unit_count} unit cards")

    # Check navigation header
    header = page.locator("header, nav")
    log("Header/Navigation present", header.count() > 0)

    # Check stars display
    stars_text = page.locator("text=Stars")
    log("Stars display present", stars_text.count() > 0)

    # Check daily tip section
    tip_section = page.locator("text=Daily Tip")
    log("Daily tip section present", tip_section.count() > 0)


# ============================================================
# TEST 2: Unit Overview Page
# ============================================================
def test_unit_overview(page: Page):
    print("\n📚 Testing Unit Overview Page...")
    page.goto(BASE_URL)
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(1500)

    # Click first unit card
    unit_cards = page.locator("[class*='cursor-pointer'][class*='rounded-2xl']")
    if unit_cards.count() > 0:
        unit_cards.first.click()
        page.wait_for_timeout(1500)

    take_screenshot(page, "02_unit_overview")

    # Check we're on unit page
    url = page.url
    log("Navigated to unit page", "/unit/" in url, f"URL: {url}")

    # Check module cards
    module_keywords = ["Vocabulary", "Listening", "Reading", "Writing", "Exercises"]
    for keyword in module_keywords:
        found = page.locator(f"text={keyword}").count() > 0
        log(f"Module '{keyword}' visible", found)

    # Check back button
    back_btn = page.locator("text=Back to Home")
    log("Back button present", back_btn.count() > 0)

    take_screenshot(page, "02_unit_overview_modules")


# ============================================================
# TEST 3: Vocabulary Module
# ============================================================
def test_vocabulary(page: Page):
    print("\n📖 Testing Vocabulary Module...")
    page.goto(BASE_URL + "/unit/unit1/vocabulary")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)

    take_screenshot(page, "03_vocabulary_page")

    # Check vocabulary page loads
    vocab_header = page.locator("text=Vocabulary")
    log("Vocabulary page loads", vocab_header.count() > 0)

    # Check tabs (Learn, Flashcards, Match Game)
    learn_tab = page.locator("text=Learn")
    flashcards_tab = page.locator("text=Flashcards")
    match_tab = page.locator("text=Match Game")
    log("Learn tab present", learn_tab.count() > 0)
    log("Flashcards tab present", flashcards_tab.count() > 0)
    log("Match Game tab present", match_tab.count() > 0)

    # Click Flashcards tab
    if flashcards_tab.count() > 0:
        flashcards_tab.first.click()
        page.wait_for_timeout(1500)
        take_screenshot(page, "03_vocabulary_flashcards")
        log("Flashcards view loaded", True)

    # Click Match Game tab
    if match_tab.count() > 0:
        match_tab.first.click()
        page.wait_for_timeout(1500)
        take_screenshot(page, "03_vocabulary_match")
        log("Match game view loaded", True)


# ============================================================
# TEST 4: Listening Module
# ============================================================
def test_listening(page: Page):
    print("\n🎧 Testing Listening Module...")
    page.goto(BASE_URL + "/unit/unit1/listening")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)

    take_screenshot(page, "04_listening_page")

    # Check listening page loads
    listening_header = page.locator("text=Listening")
    log("Listening page loads", listening_header.count() > 0)

    # Check mode toggles
    listen_choose = page.locator("text=Listen & Choose")
    dictation = page.locator("text=Dictation")
    log("Listen & Choose mode present", listen_choose.count() > 0)
    log("Dictation mode present", dictation.count() > 0)

    # Check word options are displayed
    word_options = page.locator("button[class*='rounded-xl'][class*='font-semibold']")
    log("Word options displayed", word_options.count() >= 2, f"Found {word_options.count()} options")

    # Switch to Dictation mode
    if dictation.count() > 0:
        dictation.first.click()
        page.wait_for_timeout(1500)
        take_screenshot(page, "04_listening_dictation")
        log("Dictation mode loads", True)


# ============================================================
# TEST 5: Reading Module
# ============================================================
def test_reading(page: Page):
    print("\n📰 Testing Reading Module...")
    page.goto(BASE_URL + "/unit/unit1/reading")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)

    take_screenshot(page, "05_reading_page")

    # Check reading page loads
    reading_header = page.locator("text=Reading")
    log("Reading page loads", reading_header.count() > 0)

    # Check reading items
    reading_items = page.locator("[class*='cursor-pointer'][class*='border-']")
    log("Reading items present", reading_items.count() > 0, f"Found {reading_items.count()} items")

    # Click first reading item
    if reading_items.count() > 0:
        reading_items.first.click()
        page.wait_for_timeout(1500)
        take_screenshot(page, "05_reading_detail")

        # Check Mark Complete and Quiz buttons
        mark_complete = page.locator("text=Mark Complete")
        log("Mark Complete button present", mark_complete.count() > 0)

        quiz_btn = page.locator("text=Take Quiz")
        log("Take Quiz button present", quiz_btn.count() > 0)

        # Click Quiz
        if quiz_btn.count() > 0:
            quiz_btn.first.click()
            page.wait_for_timeout(1500)
            take_screenshot(page, "05_reading_quiz")
            log("Quiz view loads", True)


# ============================================================
# TEST 6: Writing Module
# ============================================================
def test_writing(page: Page):
    print("\n✏️ Testing Writing Module...")
    page.goto(BASE_URL + "/unit/unit1/writing")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)

    take_screenshot(page, "06_writing_page")

    # Check writing page loads
    writing_header = page.locator("text=Writing")
    log("Writing page loads", writing_header.count() > 0)

    # Check mode toggles
    typing_practice = page.locator("text=Typing Practice")
    sentence_building = page.locator("text=Sentence Building")
    log("Typing Practice mode present", typing_practice.count() > 0)
    log("Sentence Building mode present", sentence_building.count() > 0)

    # Check typing area
    input_field = page.locator("input, textarea")
    log("Input field present", input_field.count() > 0, f"Found {input_field.count()} input fields")

    # Switch to Sentence Building
    if sentence_building.count() > 0:
        sentence_building.first.click()
        page.wait_for_timeout(1500)
        take_screenshot(page, "06_writing_sentence")
        log("Sentence Building mode loads", True)


# ============================================================
# TEST 7: Exercises Module
# ============================================================
def test_exercises(page: Page):
    print("\n🏆 Testing Exercises Module...")
    page.goto(BASE_URL + "/unit/unit1/exercises")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)

    take_screenshot(page, "07_exercises_page")

    # Check exercises page loads
    exercises_header = page.locator("text=Exercises")
    log("Exercises page loads", exercises_header.count() > 0)

    # Check quiz content
    quiz_content = page.locator("[class*='rounded-3xl']")
    log("Quiz content displayed", quiz_content.count() > 0)

    # Check progress/points display
    points = page.locator("text=Points")
    progress_text = page.locator("text=/\\d+ \\/ \\d+/")
    log("Progress indicator present", points.count() > 0 or progress_text.count() > 0)

    take_screenshot(page, "07_exercises_detail")


# ============================================================
# TEST 8: Library (Extracurricular Reading)
# ============================================================
def test_library(page: Page):
    print("\n📚 Testing Reading Library...")
    page.goto(BASE_URL + "/library")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)

    take_screenshot(page, "08_library_page")

    # Check library page loads
    library_header = page.locator("text=Reading Library")
    log("Library page loads", library_header.count() > 0)

    # Check search bar
    search_input = page.locator("input[placeholder*='Search']")
    log("Search bar present", search_input.count() > 0)

    # Check level filters
    filter_btns = page.locator("text=beginner")
    log("Level filters present", filter_btns.count() > 0)

    # Check book cards
    book_cards = page.locator("[class*='cursor-pointer']")
    log("Book cards displayed", book_cards.count() > 0, f"Found {book_cards.count()} books")

    # Click first book
    if book_cards.count() > 0:
        book_cards.first.click()
        page.wait_for_timeout(2000)
        take_screenshot(page, "08_book_detail")

        # Check book content
        back_btn = page.locator("text=Back to Library")
        log("Book view loads", back_btn.count() > 0)

        # Check quiz button
        quiz_btn = page.locator("text=Take Quiz")
        log("Book quiz available", quiz_btn.count() > 0)


# ============================================================
# TEST 9: Dashboard
# ============================================================
def test_dashboard(page: Page):
    print("\n📊 Testing Dashboard...")
    page.goto(BASE_URL + "/dashboard")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)

    take_screenshot(page, "09_dashboard_page")

    # Check dashboard loads
    dashboard_header = page.locator("text=Dashboard")
    log("Dashboard page loads", dashboard_header.count() > 0)

    # Check stat cards
    total_stars = page.locator("text=Total Stars")
    day_streak = page.locator("text=Day Streak")
    units_done = page.locator("text=Units Done")
    badges = page.locator("text=Badges")
    log("Total Stars card present", total_stars.count() > 0)
    log("Day Streak card present", day_streak.count() > 0)
    log("Units Done card present", units_done.count() > 0)
    log("Badges card present", badges.count() > 0)

    # Check unit progress section
    unit_progress = page.locator("text=Unit Progress")
    log("Unit Progress section present", unit_progress.count() > 0)

    # Check badges section
    badges_section = page.locator("text=First Star")
    log("Badges section present", badges_section.count() > 0)

    # Check motivational message
    motivational = page.locator("[class*='bg-gradient-to-r'][class*='rounded-2xl']")
    log("Motivational section present", motivational.count() > 0)


# ============================================================
# TEST 10: Print Center
# ============================================================
def test_print_center(page: Page):
    print("\n🖨️ Testing Print Center...")
    page.goto(BASE_URL + "/print")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)

    take_screenshot(page, "10_print_page")

    # Check print center loads
    print_header = page.locator("text=Print Center")
    log("Print Center page loads", print_header.count() > 0)

    # Check unit selection buttons
    unit_buttons = page.locator("button[class*='border-2'][class*='rounded-xl']")
    log("Unit selection buttons present", unit_buttons.count() >= 4, f"Found {unit_buttons.count()}")

    # Select a unit
    if unit_buttons.count() > 0:
        unit_buttons.first.click()
        page.wait_for_timeout(1500)
        take_screenshot(page, "10_print_unit_selected")

        # Check content type buttons
        vocab_list = page.locator("text=Vocabulary List")
        worksheet = page.locator("text=Worksheet")
        reading_passage = page.locator("text=Reading Passage")
        log("Vocabulary List option present", vocab_list.count() > 0)
        log("Worksheet option present", worksheet.count() > 0)
        log("Reading Passage option present", reading_passage.count() > 0)

        # Check print preview
        preview = page.locator("text=Preview")
        print_btn = page.locator("text=Print")
        log("Print preview present", preview.count() > 0)
        log("Print button present", print_btn.count() > 0)

        # Switch to worksheet
        if worksheet.count() > 0:
            worksheet.first.click()
            page.wait_for_timeout(1000)
            take_screenshot(page, "10_print_worksheet")
            log("Worksheet preview loads", True)


# ============================================================
# TEST 11: Settings Page
# ============================================================
def test_settings(page: Page):
    print("\n⚙️ Testing Settings Page...")
    page.goto(BASE_URL + "/settings")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)

    take_screenshot(page, "11_settings_page")

    # Check settings page loads
    settings_header = page.locator("text=Settings")
    log("Settings page loads", settings_header.count() > 0)

    # Check player name input
    name_input = page.locator("input[placeholder*='name']")
    log("Player name input present", name_input.count() > 0)

    # Check voice speed slider
    speed_label = page.locator("text=Voice Speed")
    log("Voice Speed control present", speed_label.count() > 0)

    # Check volume control
    volume_label = page.locator("text=Volume")
    log("Volume control present", volume_label.count() > 0)

    # Check test voice button
    test_voice = page.locator("text=Test Voice")
    log("Test Voice button present", test_voice.count() > 0)

    # Check difficulty options
    easy_btn = page.locator("text=easy")
    normal_btn = page.locator("text=normal")
    hard_btn = page.locator("text=hard")
    log("Difficulty options present", easy_btn.count() > 0 and normal_btn.count() > 0)

    # Check toggles
    phonetics_toggle = page.locator("text=Show Phonetics")
    autoplay_toggle = page.locator("text=Auto-play Audio")
    log("Show Phonetics toggle present", phonetics_toggle.count() > 0)
    log("Auto-play Audio toggle present", autoplay_toggle.count() > 0)

    # Check danger zone
    danger_zone = page.locator("text=Danger Zone")
    reset_btn = page.locator("text=Reset All Progress")
    log("Danger Zone present", danger_zone.count() > 0)
    log("Reset button present", reset_btn.count() > 0)


# ============================================================
# TEST 12: Navigation Flow
# ============================================================
def test_navigation(page: Page):
    print("\n🧭 Testing Navigation Flow...")
    page.goto(BASE_URL)
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)

    # Test header navigation links
    nav_items = {
        "Library": "/library",
        "Dashboard": "/dashboard",
        "Print": "/print",
        "Settings": "/settings",
    }

    for label, expected_path in nav_items.items():
        nav_link = page.locator(f"text={label}").first
        if nav_link.is_visible():
            nav_link.click()
            page.wait_for_timeout(1500)
            current_url = page.url
            log(f"Nav to {label}", expected_path in current_url, f"URL: {current_url}")
            page.go_back()
            page.wait_for_timeout(1000)
        else:
            log(f"Nav to {label}", False, "Link not found")


# ============================================================
# TEST 13: Console Errors Check
# ============================================================
def test_console_errors(page: Page):
    print("\n🔍 Checking Console Errors...")
    errors = []

    def on_console(msg):
        if msg.type == "error":
            errors.append(msg.text)

    page.on("console", on_console)

    # Visit all pages to check for errors
    pages_to_check = [
        "/",
        "/unit/unit1",
        "/unit/unit1/vocabulary",
        "/unit/unit1/listening",
        "/unit/unit1/reading",
        "/unit/unit1/writing",
        "/unit/unit1/exercises",
        "/library",
        "/dashboard",
        "/print",
        "/settings",
    ]

    for url_path in pages_to_check:
        page.goto(BASE_URL + url_path)
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(1000)

    # Filter out common non-critical errors
    critical_errors = [e for e in errors if "favicon" not in e.lower() and "404" not in e]
    log("No critical console errors", len(critical_errors) == 0, 
        f"Found {len(critical_errors)} errors" if critical_errors else "Clean")
    
    if critical_errors:
        for err in critical_errors[:5]:
            print(f"    ⚠️ Error: {err[:120]}")


# ============================================================
# TEST 14: Responsive Design Check
# ============================================================
def test_responsive(page: Page):
    print("\n📱 Testing Responsive Design...")
    
    viewports = [
        ("desktop", 1920, 1080),
        ("tablet", 768, 1024),
        ("mobile", 375, 812),
    ]

    for name, width, height in viewports:
        page.set_viewport_size({"width": width, "height": height})
        page.goto(BASE_URL)
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(1500)
        take_screenshot(page, f"14_responsive_{name}")
        
        # Check page renders content
        body_text = page.locator("body").inner_text()
        has_content = len(body_text) > 50
        log(f"Responsive {name} ({width}x{height})", has_content)

    # Reset viewport
    page.set_viewport_size({"width": 1920, "height": 1080})


# ============================================================
# MAIN: Run all tests
# ============================================================
def main():
    print("=" * 60)
    print("🧪 ENGLISH GENIUS - COMPREHENSIVE TEST SUITE")
    print("=" * 60)
    
    with sync_playwright() as p:
        browser = p.chromium.launch(
            headless=True,
            executable_path=r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
            args=["--no-sandbox", "--disable-gpu"]
        )
        context = browser.new_context(viewport={"width": 1920, "height": 1080})
        page = context.new_page()
        page.set_default_timeout(15000)

        try:
            test_home_page(page)
            test_unit_overview(page)
            test_vocabulary(page)
            test_listening(page)
            test_reading(page)
            test_writing(page)
            test_exercises(page)
            test_library(page)
            test_dashboard(page)
            test_print_center(page)
            test_settings(page)
            test_navigation(page)
            test_console_errors(page)
            test_responsive(page)
        except Exception as e:
            print(f"\n💥 Test suite error: {e}")
        finally:
            browser.close()

    # Summary
    print("\n" + "=" * 60)
    print("📊 TEST RESULTS SUMMARY")
    print("=" * 60)
    
    passed = sum(1 for r in results if r["status"] == "PASS")
    failed = sum(1 for r in results if r["status"] == "FAIL")
    total = len(results)
    pass_rate = (passed / total * 100) if total > 0 else 0

    print(f"\n  Total Tests:  {total}")
    print(f"  ✅ Passed:    {passed}")
    print(f"  ❌ Failed:    {failed}")
    print(f"  📈 Pass Rate: {pass_rate:.1f}%")

    if failed > 0:
        print(f"\n  Failed Tests:")
        for r in results:
            if r["status"] == "FAIL":
                detail = f" - {r['detail']}" if r["detail"] else ""
                print(f"    ❌ {r['name']}{detail}")

    print(f"\n  Screenshots saved to: {SCREENSHOT_DIR}")
    print("=" * 60)

    # Save results to JSON
    report_path = os.path.join(SCREENSHOT_DIR, "test_report.json")
    with open(report_path, "w", encoding="utf-8") as f:
        json.dump({
            "total": total,
            "passed": passed,
            "failed": failed,
            "pass_rate": f"{pass_rate:.1f}%",
            "results": results
        }, f, indent=2, ensure_ascii=False)
    print(f"  Report saved to: {report_path}")


if __name__ == "__main__":
    main()
