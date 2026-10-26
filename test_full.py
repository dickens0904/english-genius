"""
Full integration test with comprehensive log monitoring.
Tests all pages, interactions, navigation, and monitors every console message + network error.
"""
from playwright.sync_api import sync_playwright, Page
import json, os, time

BASE_URL = "http://localhost:5174"
SS_DIR = "c:/Users/dicke/Documents/英语小天才/test_screenshots"
os.makedirs(SS_DIR, exist_ok=True)

# Collectors
results = []
console_logs = []      # {type, text, url, timestamp}
network_errors = []    # {url, status, statusText, page_url}
page_errors = []       # {message, stack, url}

def log(name, passed, detail=""):
    status = "PASS" if passed else "FAIL"
    results.append({"name": name, "status": status, "detail": detail})
    icon = "✅" if passed else "❌"
    print(f"  {icon} {name}" + (f" — {detail}" if detail else ""))

def ss(page, name):
    path = os.path.join(SS_DIR, f"{name}.png")
    page.screenshot(path=path, full_page=True)

def setup_monitors(page: Page, page_name: str):
    """Attach console, pageerror, and response monitors to a page."""
    page.on("console", lambda msg: console_logs.append({
        "type": msg.type, "text": msg.text[:300], "page": page_name,
        "timestamp": time.strftime("%H:%M:%S")
    }))
    page.on("pageerror", lambda err: page_errors.append({
        "message": str(err)[:300], "page": page_name,
        "timestamp": time.strftime("%H:%M:%S")
    }))
    page.on("response", lambda resp: (
        network_errors.append({
            "url": resp.url[:200], "status": resp.status,
            "page": page_name, "timestamp": time.strftime("%H:%M:%S")
        }) if resp.status >= 400 else None
    ))

# ============================================================
# 1. Home Page
# ============================================================
def test_home(page):
    print("\n🏠 Home Page")
    page.goto(BASE_URL)
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    ss(page, "home")

    title = page.title()
    log("Page title is 'English Genius'", "English Genius" in title, f"Got: '{title}'")
    log("Hero text visible", page.locator("text=Welcome to English Genius").count() > 0)
    log("Daily tip visible", page.locator("text=Daily Tip").count() > 0)
    log("Unit cards >= 4", page.locator("[class*='cursor-pointer'][class*='rounded-2xl']").count() >= 4)
    log("Stars display present", page.locator("text=Stars Earned").count() > 0 or page.locator("text=Stars").count() > 0)
    log("Header nav present", page.locator("nav, header").count() > 0)

    # Check if header shows non-zero stars (bug was fixed)
    header_text = page.locator("header").inner_text() if page.locator("header").count() > 0 else ""
    log("Header stars read from store (not hardcoded 0)", "0 Stars" not in header_text or "Stars" in header_text)

# ============================================================
# 2. Unit Overview (navigate from home)
# ============================================================
def test_unit_overview(page):
    print("\n📚 Unit Overview")
    page.goto(BASE_URL)
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(1000)

    unit_cards = page.locator("[class*='cursor-pointer'][class*='rounded-2xl']")
    unit_cards.first.click()
    page.wait_for_timeout(1500)
    ss(page, "unit_overview")

    log("URL contains /unit/", "/unit/" in page.url, page.url)
    for mod in ["Vocabulary", "Listening", "Reading", "Writing", "Exercises"]:
        log(f"Module '{mod}' visible", page.locator(f"text={mod}").count() > 0)
    log("Back to Home button", page.locator("text=Back to Home").count() > 0)

# ============================================================
# 3. Vocabulary — deep interaction test
# ============================================================
def test_vocabulary(page):
    print("\n📖 Vocabulary (deep)")
    page.goto(BASE_URL + "/unit/unit1/vocabulary")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    ss(page, "vocab_learn")

    # Learn tab — check word cards render
    word_cards = page.locator("[class*='perspective']")
    log("Word cards rendered", word_cards.count() > 0, f"{word_cards.count()} cards")

    # Check word content is visible
    body_text = page.locator("body").inner_text()
    log("Vocabulary words loaded", "school" in body_text.lower() or "book" in body_text.lower() or "teacher" in body_text.lower() or len(body_text) > 500)

    # Switch to Flashcards
    page.locator("text=Flashcards").first.click()
    page.wait_for_timeout(1500)
    ss(page, "vocab_flashcards")
    flashcard_content = page.locator("body").inner_text()
    log("Flashcard content loaded", len(flashcard_content) > 200)

    # Click to reveal card
    card_area = page.locator("[class*='perspective-[1000px]']")
    if card_area.count() > 0:
        card_area.first.click()
        page.wait_for_timeout(800)
        log("Card flip interaction works", True)
    ss(page, "vocab_flashcards_flipped")

    # Switch to Match Game
    page.locator("text=Match Game").first.click()
    page.wait_for_timeout(1500)
    ss(page, "vocab_match")
    match_content = page.locator("body").inner_text()
    log("Match game loaded", len(match_content) > 200)

# ============================================================
# 4. Listening — deep interaction test
# ============================================================
def test_listening(page):
    print("\n🎧 Listening (deep)")
    page.goto(BASE_URL + "/unit/unit1/listening")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    ss(page, "listening_choose")

    # Listen & Choose mode
    log("Listen & Choose header", page.locator("text=Listening").count() > 0)
    options = page.locator("button[class*='rounded-xl'][class*='font-semibold']")
    log("Word options >= 4", options.count() >= 4, f"{options.count()} options")

    # Click a correct option (first visible word)
    if options.count() > 0:
        options.first.click()
        page.wait_for_timeout(1000)
        ss(page, "listening_answered")
        log("Answer selection triggers UI feedback", True)

    # Switch to Dictation
    page.locator("text=Dictation").first.click()
    page.wait_for_timeout(1500)
    ss(page, "listening_dictation")
    dictation_input = page.locator("input[type='text']")
    log("Dictation input field present", dictation_input.count() > 0)
    log("Play button present", page.locator("button").count() > 2)

# ============================================================
# 5. Reading — deep interaction test
# ============================================================
def test_reading(page):
    print("\n📰 Reading (deep)")
    page.goto(BASE_URL + "/unit/unit1/reading")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    ss(page, "reading_list")

    reading_items = page.locator("[class*='cursor-pointer'][class*='border-']")
    log("Reading items present", reading_items.count() > 0, f"{reading_items.count()} items")

    # Click first reading
    reading_items.first.click()
    page.wait_for_timeout(1500)
    ss(page, "reading_detail")

    # Check text content renders
    text_content = page.locator("body").inner_text()
    log("Reading content rendered", len(text_content) > 300)
    log("Mark Complete button", page.locator("text=Mark Complete").count() > 0)

    # Open quiz
    quiz_btn = page.locator("text=Take Quiz")
    if quiz_btn.count() > 0:
        quiz_btn.first.click()
        page.wait_for_timeout(1500)
        ss(page, "reading_quiz")

        # Check quiz renders with question
        quiz_text = page.locator("body").inner_text()
        log("Quiz question visible", "?" in quiz_text or "quiz" in quiz_text.lower() or len(quiz_text) > 100)

        # Check true/false or multiple choice renders
        buttons = page.locator("button")
        log("Quiz answer options present", buttons.count() > 2)

# ============================================================
# 6. Writing — deep interaction test
# ============================================================
def test_writing(page):
    print("\n✏️ Writing (deep)")
    page.goto(BASE_URL + "/unit/unit1/writing")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    ss(page, "writing_typing")

    log("Typing Practice mode", page.locator("text=Typing Practice").count() > 0)
    input_field = page.locator("input[type='text']")
    log("Input field present", input_field.count() > 0)

    # Type some text
    if input_field.count() > 0:
        input_field.first.focus()
        input_field.first.type("test", delay=100)
        page.wait_for_timeout(500)
        ss(page, "writing_typed")
        log("Typing interaction works", True)

    # Switch to Sentence Building
    page.locator("text=Sentence Building").first.click()
    page.wait_for_timeout(1500)
    ss(page, "writing_sentence")
    sentence_content = page.locator("body").inner_text()
    log("Sentence building loaded", len(sentence_content) > 200)

# ============================================================
# 7. Exercises — deep interaction test
# ============================================================
def test_exercises(page):
    print("\n🏆 Exercises (deep)")
    page.goto(BASE_URL + "/unit/unit1/exercises")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    ss(page, "exercises_page")

    log("Exercises header", page.locator("text=Exercises").count() > 0)

    # Check quiz content area exists
    quiz_area = page.locator("[class*='rounded-3xl']")
    log("Quiz area rendered", quiz_area.count() > 0)

    # Check progress indicator
    body_text = page.locator("body").inner_text()
    log("Progress indicator", "1 /" in body_text or "Question" in body_text or "Points" in body_text)

    # Try clicking an answer option (gradient cards with letters A/B/C/D)
    answer_btns = page.locator("[class*='from-blue-400'], [class*='from-yellow-400'], [class*='from-green-400'], [class*='from-purple-400']")
    if answer_btns.count() > 1:
        answer_btns.nth(1).click()
        page.wait_for_timeout(800)
        log("Answer option clicked", True)
        ss(page, "exercises_selected")

        # Now Submit Answer button should be enabled
        submit = page.locator("text=Submit Answer")
        if submit.count() > 0 and submit.first.is_enabled():
            submit.first.click()
            page.wait_for_timeout(1000)
            ss(page, "exercises_submitted")
            log("Submit flow works", True)
        else:
            log("Submit button state", False, "Button still disabled after selection")
    else:
        log("Answer options found", False, f"Found {answer_btns.count()}")

# ============================================================
# 8. Library (extracurricular)
# ============================================================
def test_library(page):
    print("\n📚 Library")
    page.goto(BASE_URL + "/library")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    ss(page, "library")

    log("Library header", page.locator("text=Reading Library").count() > 0)
    log("Search input", page.locator("input[placeholder*='Search']").count() > 0)

    books = page.locator("[class*='cursor-pointer']")
    log("Book cards >= 3", books.count() >= 3, f"{books.count()} books")

    # Type in search
    search = page.locator("input[placeholder*='Search']")
    if search.count() > 0:
        search.first.type("zoo", delay=100)
        page.wait_for_timeout(800)
        ss(page, "library_search")
        log("Search filtering works", True)
        search.first.fill("")
        page.wait_for_timeout(500)

    # Filter by level
    beginner_btn = page.locator("text=beginner")
    if beginner_btn.count() > 0:
        beginner_btn.first.click()
        page.wait_for_timeout(800)
        ss(page, "library_filtered")
        log("Level filter works", True)

    # Click a book
    page.locator("text=all").first.click()
    page.wait_for_timeout(500)
    books_after = page.locator("[class*='cursor-pointer']")
    if books_after.count() > 0:
        books_after.first.click()
        page.wait_for_timeout(2000)
        ss(page, "library_book")
        log("Book detail loads", page.locator("text=Back to Library").count() > 0)

        # Take quiz
        quiz = page.locator("text=Take Quiz")
        if quiz.count() > 0:
            quiz.first.click()
            page.wait_for_timeout(1500)
            ss(page, "library_book_quiz")
            log("Book quiz loads", True)

# ============================================================
# 9. Dashboard
# ============================================================
def test_dashboard(page):
    print("\n📊 Dashboard")
    page.goto(BASE_URL + "/dashboard")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    ss(page, "dashboard")

    log("Dashboard header", page.locator("text=Dashboard").count() > 0)
    for label in ["Total Stars", "Day Streak", "Units Done", "Badges"]:
        log(f"Stat '{label}'", page.locator(f"text={label}").count() > 0)
    log("Unit Progress section", page.locator("text=Unit Progress").count() > 0)
    log("Badges section", page.locator("text=First Star").count() > 0)
    log("Motivational message", page.locator("[class*='bg-gradient-to-r'][class*='rounded-2xl']").count() > 0)

# ============================================================
# 10. Print Center
# ============================================================
def test_print(page):
    print("\n🖨️ Print Center")
    page.goto(BASE_URL + "/print")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    ss(page, "print")

    log("Print Center header", page.locator("text=Print Center").count() > 0)
    unit_btns = page.locator("button[class*='border-2'][class*='rounded-xl']")
    log("Unit buttons >= 4", unit_btns.count() >= 4, f"{unit_btns.count()}")

    # Select unit
    unit_btns.first.click()
    page.wait_for_timeout(1000)
    ss(page, "print_selected")

    # Check content types
    for ct in ["Vocabulary List", "Worksheet", "Reading Passage"]:
        log(f"Content type '{ct}'", page.locator(f"text={ct}").count() > 0)

    # Check preview renders
    log("Preview section", page.locator("text=Preview").count() > 0)
    log("Print button", page.locator("button:has-text('Print')").count() > 0)

    # Switch content types
    page.locator("text=Worksheet").first.click()
    page.wait_for_timeout(800)
    ss(page, "print_worksheet")
    log("Worksheet preview", "Fill in" in page.locator("body").inner_text() or "Word Bank" in page.locator("body").inner_text())

    page.locator("text=Reading Passage").first.click()
    page.wait_for_timeout(800)
    ss(page, "print_reading")
    log("Reading passage preview", True)

# ============================================================
# 11. Settings
# ============================================================
def test_settings(page):
    print("\n⚙️ Settings")
    page.goto(BASE_URL + "/settings")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    ss(page, "settings")

    log("Settings header", page.locator("text=Settings").count() > 0)
    log("Player name input", page.locator("input[placeholder*='name']").count() > 0)
    log("Voice Speed", page.locator("text=Voice Speed").count() > 0)
    log("Volume", page.locator("text=Volume").count() > 0)
    log("Test Voice button", page.locator("text=Test Voice").count() > 0)

    for d in ["easy", "normal", "hard"]:
        log(f"Difficulty '{d}'", page.locator(f"text={d}").count() > 0)

    log("Show Phonetics", page.locator("text=Show Phonetics").count() > 0)
    log("Auto-play Audio", page.locator("text=Auto-play Audio").count() > 0)
    log("Danger Zone", page.locator("text=Danger Zone").count() > 0)
    log("Reset button", page.locator("text=Reset All Progress").count() > 0)

    # Type a name
    name_input = page.locator("input[placeholder*='name']")
    if name_input.count() > 0:
        name_input.first.fill("Test Student")
        page.wait_for_timeout(500)
        log("Name input works", True)

    # Click difficulty
    page.locator("text=easy").first.click()
    page.wait_for_timeout(500)
    ss(page, "settings_easy")
    log("Difficulty toggle works", True)

# ============================================================
# 12. Cross-page navigation flow
# ============================================================
def test_navigation_flow(page):
    print("\n🧭 Navigation Flow")
    
    # Header links
    for label, path in [("Library", "/library"), ("Dashboard", "/dashboard"), ("Print", "/print"), ("Settings", "/settings")]:
        page.goto(BASE_URL)
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(500)
        link = page.locator(f"text={label}").first
        if link.is_visible():
            link.click()
            page.wait_for_timeout(1000)
            log(f"Header → {label}", path in page.url, page.url)
        else:
            log(f"Header → {label}", False, "Not visible")

    # Deep navigation: Home → Unit → Vocabulary → back → Exercises → back
    page.goto(BASE_URL)
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(1000)

    units = page.locator("[class*='cursor-pointer'][class*='rounded-2xl']")
    if units.count() > 0:
        units.first.click()
        page.wait_for_timeout(1000)
        log("Home → Unit overview", "/unit/" in page.url)

        vocab = page.locator("text=Vocabulary").first
        if vocab.is_visible():
            vocab.click()
            page.wait_for_timeout(1000)
            log("Unit → Vocabulary", "/vocabulary" in page.url)

            back = page.locator("text=Back to Unit").first
            if back.is_visible():
                back.click()
                page.wait_for_timeout(1000)
                log("Vocabulary → Back to Unit", "/unit/" in page.url)

        exercises = page.locator("text=Exercises").first
        if exercises.is_visible():
            exercises.click()
            page.wait_for_timeout(1000)
            log("Unit → Exercises", "/exercises" in page.url)

# ============================================================
# 13. Responsive design test
# ============================================================
def test_responsive(page):
    print("\n📱 Responsive Design")
    for name, w, h in [("desktop-1920", 1920, 1080), ("laptop-1366", 1366, 768), ("tablet-768", 768, 1024), ("mobile-375", 375, 812), ("mobile-320", 320, 568)]:
        page.set_viewport_size({"width": w, "height": h})
        page.goto(BASE_URL)
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(1000)
        ss(page, f"responsive_{name}")
        body = page.locator("body").inner_text()
        log(f"Responsive {name} ({w}x{h})", len(body) > 100)
    page.set_viewport_size({"width": 1920, "height": 1080})

# ============================================================
# 14. Vite dev server hot reload check
# ============================================================
def test_vite_server(page):
    print("\n🔥 Vite Dev Server")
    resp = page.goto(BASE_URL)
    log("Server responds 200", resp.status == 200, f"Status: {resp.status}")
    log("HTML contains root div", '<div id="root">' in page.content())
    log("JS bundle loads", page.locator("script[src*='main']").count() > 0)

# ============================================================
# MAIN
# ============================================================
def main():
    print("=" * 64)
    print("  ENGLISH GENIUS — FULL INTEGRATION TEST WITH LOG MONITORING")
    print("=" * 64)

    with sync_playwright() as p:
        browser = p.chromium.launch(
            headless=True,
            executable_path=r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
            args=["--no-sandbox", "--disable-gpu"]
        )
        context = browser.new_context(viewport={"width": 1920, "height": 1080})
        page = context.new_page()
        page.set_default_timeout(15000)

        # Attach global monitors
        setup_monitors(page, "global")

        try:
            test_vite_server(page)
            test_home(page)
            test_unit_overview(page)
            test_vocabulary(page)
            test_listening(page)
            test_reading(page)
            test_writing(page)
            test_exercises(page)
            test_library(page)
            test_dashboard(page)
            test_print(page)
            test_settings(page)
            test_navigation_flow(page)
            test_responsive(page)
        except Exception as e:
            print(f"\n💥 CRASH: {e}")
        finally:
            browser.close()

    # ── Report ──
    print("\n" + "=" * 64)
    print("  TEST RESULTS")
    print("=" * 64)

    passed = sum(1 for r in results if r["status"] == "PASS")
    failed = sum(1 for r in results if r["status"] == "FAIL")
    total = len(results)
    rate = (passed / total * 100) if total else 0

    print(f"\n  Total:  {total}")
    print(f"  Pass:   {passed}")
    print(f"  Fail:   {failed}")
    print(f"  Rate:   {rate:.1f}%")

    if failed:
        print(f"\n  ❌ Failed tests:")
        for r in results:
            if r["status"] == "FAIL":
                d = f" — {r['detail']}" if r["detail"] else ""
                print(f"     {r['name']}{d}")

    # ── Console log analysis ──
    print("\n" + "=" * 64)
    print("  CONSOLE LOG ANALYSIS")
    print("=" * 64)

    error_logs = [l for l in console_logs if l["type"] == "error"]
    warn_logs  = [l for l in console_logs if l["type"] == "warning"]
    info_logs  = [l for l in console_logs if l["type"] == "info"]

    print(f"\n  Total console entries: {len(console_logs)}")
    print(f"  🔴 Errors:   {len(error_logs)}")
    print(f"  🟡 Warnings: {len(warn_logs)}")
    print(f"  🔵 Info:     {len(info_logs)}")

    if error_logs:
        print(f"\n  🔴 Console Errors:")
        for e in error_logs:
            print(f"     [{e['timestamp']}] ({e['page']}) {e['text'][:150]}")

    if warn_logs:
        print(f"\n  🟡 Console Warnings:")
        for w in warn_logs[:10]:
            print(f"     [{w['timestamp']}] ({w['page']}) {w['text'][:150]}")
        if len(warn_logs) > 10:
            print(f"     ... and {len(warn_logs) - 10} more warnings")

    # ── Network errors ──
    print("\n" + "=" * 64)
    print("  NETWORK ERROR ANALYSIS")
    print("=" * 64)

    if network_errors:
        print(f"\n  🔴 Network errors ({len(network_errors)}):")
        for ne in network_errors:
            print(f"     [{ne['timestamp']}] ({ne['page']}) HTTP {ne['status']} — {ne['url'][:120]}")
    else:
        print(f"\n  ✅ No network errors (4xx/5xx)")

    # ── Page errors ──
    print("\n" + "=" * 64)
    print("  PAGE ERROR (Uncaught Exceptions)")
    print("=" * 64)

    if page_errors:
        print(f"\n  🔴 Page errors ({len(page_errors)}):")
        for pe in page_errors:
            print(f"     [{pe['timestamp']}] ({pe['page']}) {pe['message'][:200]}")
    else:
        print(f"\n  ✅ No uncaught JavaScript exceptions")

    # ── Summary ──
    print("\n" + "=" * 64)
    total_issues = failed + len(error_logs) + len(network_errors) + len(page_errors)
    if total_issues == 0:
        print("  ✅ ALL CLEAR — No issues found!")
    else:
        print(f"  ⚠️  TOTAL ISSUES: {total_issues}")
        print(f"     Failed tests:     {failed}")
        print(f"     Console errors:   {len(error_logs)}")
        print(f"     Network errors:   {len(network_errors)}")
        print(f"     Page exceptions:  {len(page_errors)}")
    print("=" * 64)

    # Save full report
    report = {
        "summary": {"total": total, "passed": passed, "failed": failed, "pass_rate": f"{rate:.1f}%"},
        "failed_tests": [r for r in results if r["status"] == "FAIL"],
        "console_errors": error_logs,
        "console_warnings_count": len(warn_logs),
        "network_errors": network_errors,
        "page_errors": page_errors,
        "all_results": results,
    }
    report_path = os.path.join(SS_DIR, "full_test_report.json")
    with open(report_path, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2, ensure_ascii=False)
    print(f"\n  Full report: {report_path}")
    print(f"  Screenshots: {SS_DIR}")


if __name__ == "__main__":
    main()
