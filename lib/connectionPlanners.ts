export type PlannerKind = "help" | "mates" | "fatherhood";
export type Answers = Record<string, string>;
export type Plan = { title: string; sections: { title: string; text: string }[] };
type Field = { key: string; label: string; placeholder?: string; options?: string[]; optional?: boolean };
type Planner = { title: string; intro: string; action: string; fields: Field[]; example: Answers };

export const planners: Record<PlannerKind, Planner> = {
  help: {
    title: "Make a clear help request",
    intro: "Leave with wording you can use, a handover checklist and a fallback if the answer is no.",
    action: "Build my help request",
    fields: [
      { key: "person", label: "Who can reasonably help?", placeholder: "e.g. My sister — use a role or first name" },
      { key: "task", label: "What are you asking them to do?", placeholder: "Start with a verb: take Dad to his appointment and bring him home" },
      { key: "when", label: "When does it need to happen?", placeholder: "e.g. Thursday, appointment at 10am" },
      { key: "reply", label: "When do you need their answer?", placeholder: "e.g. Tuesday evening, before I confirm work" },
      { key: "handover", label: "What will you provide or keep responsibility for?", placeholder: "e.g. Send the clinic address and confirm Dad is ready" },
      { key: "fallback", label: "If they cannot help, what will you change?", placeholder: "e.g. Ask my manager to move the site visit, then confirm transport" },
    ],
    example: { person: "Sam", task: "take Dad to his appointment and bring him home", when: "Thursday, appointment at 10am", reply: "Tuesday evening", handover: "send the address and confirm Dad is ready", fallback: "ask my manager to move the site visit, then confirm transport" },
  },
  mates: {
    title: "Plan the first message",
    intro: "Write an invitation that sounds like you. Make room for an answer without turning it into a chase.",
    action: "Build my reconnection plan",
    fields: [
      { key: "situation", label: "What is the situation?", options: ["We simply lost touch", "I owe an apology", "They asked for no contact"] },
      { key: "person", label: "Who would you like to reconnect with?", placeholder: "e.g. Alex — a first name or nickname is enough" },
      { key: "reason", label: "What made you think of them?", placeholder: "e.g. I drove past the old workshop" },
      { key: "invitation", label: "What small catch-up can you offer?", placeholder: "e.g. a half-hour walk by the river" },
      { key: "when", label: "What time can you genuinely offer?", placeholder: "e.g. Sunday between eight and nine" },
      { key: "repair", label: "If you owe an apology, what do you need to own?", placeholder: "e.g. I cancelled twice and never came back with a date", optional: true },
    ],
    example: { situation: "We simply lost touch", person: "Alex", reason: "I drove past the old workshop", invitation: "a half-hour walk by the river", when: "Sunday between eight and nine", repair: "" },
  },
  fatherhood: {
    title: "Make room for one child this week",
    intro: "Plan your part: a small invitation, something to listen for and a promise you can keep. This does not score your child or measure the relationship.",
    action: "Build my connection plan",
    fields: [
      { key: "stage", label: "Which stage fits best?", options: ["Younger child", "Teenager", "Adult child"] },
      { key: "situation", label: "What needs attention this week?", options: ["Ordinary time together", "Keeping contact while apart", "Repairing a moment I got wrong"] },
      { key: "interest", label: "What matters to your child at the moment?", placeholder: "e.g. Learning to cook a favourite meal" },
      { key: "moment", label: "What small activity or contact could you offer?", placeholder: "Finish ‘I’d like to…’: cook dinner with you and try a recipe you choose" },
      { key: "when", label: "When can you offer it?", placeholder: "e.g. Wednesday before dinner, if that suits them" },
      { key: "promise", label: "What will you do differently or follow through on?", placeholder: "e.g. Put my phone away and listen before offering advice" },
      { key: "repair", label: "If you need to apologise, what is your part?", placeholder: "e.g. I interrupted and made a joke about something serious", optional: true },
    ],
    example: { stage: "Teenager", situation: "Ordinary time together", interest: "Learning to cook a favourite meal", moment: "cook dinner with you and try a recipe you choose", when: "Wednesday before dinner", promise: "put my phone away and listen before offering advice", repair: "" },
  },
};

export function buildPlan(kind: PlannerKind, raw: Answers): { plan?: Plan; errors: Answers } {
  const answers = Object.fromEntries(Object.entries(raw).map(([key, value]) => [key, value.trim()]));
  const config = planners[kind];
  // A request for no contact takes priority over constructing an invitation.
  if (kind === "mates" && answers.situation === "They asked for no contact") {
    return { errors: {}, plan: { title: "Respect the request for no contact", sections: [
      { title: "Your next action", text: "Do not send an invitation or a follow-up. Do not try another channel or ask someone else to contact them for you." },
      { title: "Where to put your effort", text: "If it helps, write down what you wish you had said privately, without sending it. Put your next invitation into a different friendship where contact is welcome." },
    ] } };
  }
  const errors: Answers = {};
  for (const field of config.fields) {
    if (!field.optional && !answers[field.key]) errors[field.key] = "Add an answer for this field.";
    if (field.options && answers[field.key] && !field.options.includes(answers[field.key])) errors[field.key] = "Choose one of the listed options.";
  }
  if ((kind === "mates" && answers.situation === "I owe an apology") ||
      (kind === "fatherhood" && answers.situation === "Repairing a moment I got wrong")) {
    if (!answers.repair) errors.repair = "Name your part before planning the invitation.";
  }
  if (Object.keys(errors).length) return { errors };
  if (kind === "help") return { errors, plan: { title: "Your help request", sections: [
    { title: "Wording to adapt", text: `Hi ${answers.person}. Could you ${answers.task}? It needs to happen ${answers.when}. Could you let me know by ${answers.reply} whether that works for you? I will ${answers.handover}. If you cannot, please say so and I will change the plan.` },
    { title: "Before you ask", text: "Check their capacity and whether the task is yours to hand over. If this is a shared responsibility, discuss a fair division together. Your plan is a request, not an agreement." },
    { title: "If they agree", text: `Confirm exactly which part they are taking and the timing: ${answers.when}. Your handover: ${answers.handover}. Give them the information they need, then leave room for their way of doing it.` },
    { title: "If they cannot", text: answers.fallback },
    { title: "Before you rely on the help", text: "Wait for a clear answer. If your fallback changes an existing promise, tell the affected person early. This page has not contacted anyone or arranged cover." },
  ] } };
  if (kind === "mates") return { errors, plan: { title: "Your reconnection plan", sections: [
    { title: "First message to adapt", text: answers.situation === "I owe an apology"
      ? `Hi ${answers.person}. ${answers.repair}. I'm sorry. ${answers.reason}, and I thought of you. If you are open to it, would you fancy ${answers.invitation}? I am free ${answers.when}. No pressure if you would rather not.`
      : `Hi ${answers.person}. ${answers.reason}, and I thought of you. It has been a while. Fancy ${answers.invitation}? I am free ${answers.when}. Let me know if that suits, or if another time would be easier.` },
    { title: "If they are keen", text: `Confirm the time, place or call channel together. Your offered window is ${answers.when}. Keep the first catch-up small and leave room to hear how they are.` },
    { title: "If the time does not suit", text: "Accept that answer. If they want to meet, ask for an alternative that fits both lives. Do not turn a declined date into a verdict about the friendship." },
    { title: "If there is no reply", text: "Give them space. In an established friendship where contact is welcome, consider one gentle follow-up after a reasonable gap, then leave the choice with them. Do not chase through other channels." },
    { title: "After the catch-up", text: "If you both enjoyed it, agree whether you would like to do it again. Only promise the next contact you can actually make. Nothing has been sent or scheduled by this page." },
  ] } };
  const stageAdvice = answers.stage === "Younger child"
    ? "Join their activity, let them show you something and use words or another way of communicating that suits them. Do not make the time a test."
    : answers.stage === "Teenager"
      ? "Ask whether the time suits, show interest without taking over and listen before offering advice. Respect privacy and let them decline the invitation without managing your disappointment."
      : "Treat the time as an invitation between adults. Ask what involvement is welcome and whether they want your advice; accept their answer.";
  return { errors, plan: { title: "Your fatherhood connection plan", sections: [
    { title: "What I am paying attention to", text: answers.interest },
    ...(answers.situation === "Repairing a moment I got wrong" ? [{ title: "Repair comes first", text: `I need to own this: ${answers.repair}. Apologise plainly without asking for immediate forgiveness or using the activity as a reward for accepting the apology.` }] : []),
    { title: "An invitation to adapt", text: `I'd like to ${answers.moment}. A time I can offer is ${answers.when}. Would that work for you? If not, we can find another way to spend a little time together.` },
    { title: "Make the invitation fit", text: stageAdvice },
    ...(answers.situation === "Keeping contact while apart" ? [{ title: "When we are apart", text: "Use an agreed contact time and channel that suit your child and existing arrangements. Coordinate with the responsible adult where needed. Do not ask the child to carry messages between adults." }] : []),
    { title: "My promise this week", text: answers.promise },
    { title: "If the invitation does not work", text: "Stay warm. Ask what would suit, or offer another small opening later. Closeness is not owed in return for your effort. Do not use this plan to override safety or contact arrangements." },
    { title: "What I will review afterwards", text: "Did I keep my part? What did I learn about my child? What might I offer differently next time? Review your behaviour, not how grateful or talkative they were. Nothing is sent or scheduled by this page." },
  ] } };
}

export function planText(plan: Plan) {
  return [plan.title, ...plan.sections.map(section => `${section.title}\n${section.text}`),
    "Practical planning guidance. Adapt the wording before using it. Nothing was sent or scheduled by this page."].join("\n\n");
}
