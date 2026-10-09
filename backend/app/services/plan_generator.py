import re

from app.models.task import PlanStep


_PLAN_TEMPLATES = {
    "software": [
        ("Clarify requirements", "Identify expected behavior, constraints, and success criteria."),
        ("Inspect project context", "Review available project files, references, and implementation boundaries."),
        ("Design the implementation", "Choose an approach that fits the existing architecture and requested outcome."),
        ("Implement the changes", "Make the code or configuration changes required by the goal."),
        ("Run project checks", "Run relevant builds, tests, and static checks for the changed areas."),
        ("Address issues", "Resolve failures or gaps found during implementation and checks."),
        ("Verify requirements", "Compare the resulting changes against the original goal and constraints."),
        ("Deliver the project", "Summarize the completed work and provide relevant outputs."),
    ],
    "research": [
        ("Define the research objective", "Clarify the question, scope, audience, and evidence constraints."),
        ("Gather source material", "Identify relevant source material and note its reliability and coverage."),
        ("Set comparison criteria", "Organize the dimensions needed to answer the research question."),
        ("Research the subject", "Collect findings relevant to the goal from the available source material."),
        ("Compare and synthesize findings", "Relate the evidence to the criteria and identify patterns or trade-offs."),
        ("Review completeness", "Check that important parts of the question and scope are addressed."),
        ("Verify sources and format", "Check source traceability and ensure the requested output format is followed."),
        ("Deliver the research output", "Present the findings, comparisons, and limitations in a clear deliverable."),
    ],
    "analysis": [
        ("Define the analysis question", "Identify the outcome, relevant measures, and constraints."),
        ("Inspect the dataset and context", "Review available data, fields, units, and known limitations."),
        ("Prepare the analysis approach", "Select suitable comparisons and checks for the question."),
        ("Assess data quality", "Look for missing, inconsistent, or anomalous values that affect interpretation."),
        ("Analyze patterns", "Compute and interpret trends, relationships, segments, and notable deviations."),
        ("Check the interpretation", "Test whether conclusions are supported and distinguish evidence from assumptions."),
        ("Prepare the requested output", "Organize findings, caveats, and supporting summaries in the requested format."),
        ("Deliver the analysis", "Summarize the important patterns and their implications."),
    ],
    "content": [
        ("Clarify the audience and purpose", "Identify the intended readers, desired outcome, and constraints."),
        ("Review supplied context", "Collect the background, references, and requirements for the deliverable."),
        ("Organize the content", "Create a structure that covers the requested subject in a useful order."),
        ("Draft the deliverable", "Develop the requested document, report, roadmap, or other content."),
        ("Review accuracy and coverage", "Check the draft against source material, scope, and requested detail."),
        ("Refine the presentation", "Improve clarity and consistency while preserving the requested format."),
        ("Deliver the final output", "Present the deliverable and summarize its contents."),
    ],
    "automation": [
        ("Define the workflow outcome", "Clarify the trigger, expected result, constraints, and failure conditions."),
        ("Inspect available systems and context", "Identify relevant inputs, connected services, and access boundaries."),
        ("Map workflow stages", "Break the requested process into ordered steps and decision points."),
        ("Design the automation approach", "Specify how each stage should operate and handle exceptions."),
        ("Review safety and failure cases", "Identify sensitive actions, recovery needs, and approval boundaries."),
        ("Validate workflow requirements", "Check that the proposed stages cover the requested outcome and constraints."),
        ("Deliver the workflow plan", "Present the proposed workflow and its assumptions for review."),
    ],
}


def _infer_intent(goal: str, task_type: str) -> str:
    text = goal.lower()
    if re.search(r"\b(dataset|data|analy[sz]e|analysis|trend|pattern|metrics|telemetry|csv)\b", text):
        return "analysis"
    if re.search(r"\b(research|investigat|compare|comparison|sources|literature|frameworks)\b", text):
        return "research"
    if re.search(r"\b(build|implement|code|software|website|app|debug|develop|program)\b", text):
        return "software"
    if re.search(r"\b(automate|automation|workflow|pipeline|schedule|scrape)\b", text):
        return "automation"
    if re.search(r"\b(write|draft|create|document|report|roadmap|presentation|content)\b", text):
        return "content"

    normalized_type = task_type.lower()
    if normalized_type in {"coding", "software", "development"}:
        return "software"
    if normalized_type in _PLAN_TEMPLATES:
        return normalized_type
    return "content"


def generate_plan(goal: str, task_type: str) -> list[PlanStep]:
    """Create an initial, non-executed plan based on the requested goal."""
    intent = _infer_intent(goal, task_type)
    template = _PLAN_TEMPLATES[intent]

    def step_type(title: str) -> str:
        normalized_title = title.lower()
        if any(word in normalized_title for word in ("research", "gather", "compare", "source")):
            return "research"
        if any(word in normalized_title for word in ("implement", "draft", "design", "map")):
            return "execution"
        if any(word in normalized_title for word in ("verify", "review", "check", "assess")):
            return "review"
        if any(word in normalized_title for word in ("deliver", "prepare", "present")):
            return "delivery"
        return "analysis"

    return [
        PlanStep(
            id=f"step-{index}",
            title=title,
            description=description,
            type=step_type(title),
            status="pending",
        )
        for index, (title, description) in enumerate(template, start=1)
    ]