import sys
sys.path.insert(0, "services/analytics/src")
from events import AnalyticsEvent
from tracking import AnalyticsTracker
from processing import AnalyticsProcessor
from reporting import AnalyticsReporter
def test_analytics_foundation_pipeline():
    tracker = AnalyticsTracker()
    tracker.track(AnalyticsEvent("page_view"))
    tracker.track(AnalyticsEvent("page_view"))
    tracker.track(AnalyticsEvent("button_click"))
    metrics = AnalyticsProcessor().process(tracker.get_events())
    report = AnalyticsReporter().report(metrics)
    assert tracker.count() == 3
    assert metrics["total_events"] == 3
    assert metrics["event_counts"] == {
        "page_view": 2,
        "button_click": 1,
    }
    assert report["summary"]["total_events"] == 3
    assert report["summary"]["event_counts"]["page_view"] == 2
