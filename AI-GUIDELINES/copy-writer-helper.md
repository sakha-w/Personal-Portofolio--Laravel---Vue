# Portfolio Copy Harness - Sakha Wibisono
# sakha-dev.indonesiacentral.cloudapp.azure.com
# Pages complete: 4 of 8 (home, about, experience, contact)

---

## How to Use

Single-source harness for all text content on Sakha's portfolio.
Agent reads top to bottom, finds page separator `# PAGE: /route`,
then finds section heading `## <SECTION>`, and takes the text
inside the triple backtick block directly below it.

### Label Convention

| Label | Meaning |
|---|---|
| `# PAGE: /route` | Page boundary |
| `## Meta` | title and description for HTML head |
| `## Tagline` | Small text above main heading |
| `## Heading` | Main page heading (h1) |
| `## Sub-copy` | Short text below heading |
| `## Body Copy` | Main narrative paragraphs |
| `## Section: Name` | Separate content block within a page |
| `**Label**` | Small text above section heading |
| `**Paragraph N**` | Paragraph order within a section |
| `**CTA**` | Call-to-action text or link |
| `**Button**` | Button label |
| `**Tech stack tags**` | Technology tags for experience card |
| `field:` | Form field name |
| `placeholder:` | Input placeholder text |
| `required:` | Boolean required/optional |
| `submit_button:` | Form submit button text |

### Tone and Style Rules

- No em-dash, no special characters, plain ASCII only
- Sentence length varies, no uniform rhythm
- No repetitive parallel structures
- Specific to Sakha's real experience, not generic descriptions
- English that reads like a person wrote it

### Page Status

| Route | Status |
|---|---|
| / | Ready |
| /about | Ready |
| /experience | Ready |
| /contact | Ready |
| /skills | Pending - needs tech stack list from Sakha |
| /education | Pending - needs thesis abstract confirmation |
| /certificates | Pending - needs full certificate list |
| /projects | Pending - needs project list with descriptions |

### Footer - Do Not Change

```
(c) 2026 Sakha Wibisono
Made with Astro, Vue & a little patience.
```

---
---

# PAGE: /

---

## Meta

```
title: Sakha Wibisono | Frontend Developer
description: Frontend developer and Informatics graduate from Telkom University.
I build responsive interfaces and connect them to the data behind them.
```

---

## Tagline

```
Frontend developer - Fresh graduate, Informatics Telkom University
```

---

## Hero Heading

```
Hi, I'm Sakha. I build things for the web.
```

---

## Hero Body

```
Mostly interfaces. Sometimes the backend behind them. I've shipped SSO screens
for a state-owned enterprise, built sales dashboards for a fintech platform,
and helped develop academic tools used inside Telkom University. Somewhere in
between all of that, I wrote a thesis on using generative AI to map maintenance
workflows in power plant data.
```

---

## Section: A Little Context

**Label**
```
A little context
```

**Heading**
```
Learning by building.
```

**Body**
```
Started with a diploma in Software Application Engineering, then moved into the
Informatics bachelor's program at the same university. Not because two degrees
look good on paper, but because every finished project left me with more
questions than when I started.
```

**CTA**
```
More about me
```

---

## Section: Most Recently

**Label**
```
Most recently
```

**Heading**
```
Programmer intern at Peruri.
```

**Body**
```
Three months finding out what secure authentication actually means when real
users depend on it. Astro, Vue, OAuth 2.0, OpenID Connect, and a long list of
edge cases that nobody bothered writing documentation for.
```

**CTA**
```
My experience
```

---

## Section: CTA Bottom

**Label**
```
Have something in mind?
```

**Heading**
```
I'd like to hear about it.
```

**Body**
```
A role, a project, or just a question about something in my work. Send me a
note and we can take it from there.
```

**Button**
```
Get in touch
```

---
---

# PAGE: /about

---

## Meta

```
title: About | Sakha Wibisono
description: From a clinic records app to SSO at a state-owned enterprise.
Here is how I have been learning to build software that people actually use.
```

---

## Tagline

```
Beyond the resume
```

---

## Heading

```
A little about me.
```

---

## Body Copy - Main Story

**Paragraph 1**
```
My name is Sakha. I graduated from the D3 Software Application Engineering
program at Telkom University in 2024, then continued straight into the S1
Informatics program at the same campus.
```

**Paragraph 2**
```
My diploma thesis was MedRecordX, a patient medical record application built
for Telagasari Azimat Clinic. Small project by most measures, but it was the
first time I had to build something that real people would rely on every
single working day. That shifts how you think about error handling.
```

**Paragraph 3**
```
After graduating, I interned at PuTI Telkom University as a frontend developer,
helping build and maintain the university's internal academic information system
using AngularJS. Part of that work involved integrating the T-Feeder application
with Neo Feeder PDDIKTI, which meant coordinating across backend teams and
understanding how API-based data synchronization actually holds up at
institutional scale.
```

**Paragraph 4**
```
Then I joined the Asah Ied by Dicoding cohort. This one ran closer to a real
job than any training program I had been through. I led the React frontend and
handled backend integration for a predictive lead scoring app in a banking
context. The backend ran on Supabase. I managed database design, authentication,
authorization, and the connection to the ML model. We worked in Agile sprints,
and almost every sprint had something go sideways. That turned out to be where
most of the real learning happened.
```

**Paragraph 5**
```
Most recently, I interned at Perum Peruri in Jakarta, where I built the SSO
frontend module using Astro and Vue.js with a hybrid SSR and SPA architecture.
That meant properly implementing OAuth 2.0 and OpenID Connect, including token
exchange, refresh logic, and all the access protection edge cases that tutorials
tend to gloss over. It was the first project where I genuinely felt the weight
of getting authentication wrong.
```

**Paragraph 6**
```
My bachelor's thesis looks at using generative AI for process discovery in
operational maintenance data at an electric power company. That work pulled me
toward data science and process mining more seriously than any coursework had.
```

---

## Section: What I'm Working On Now

**Label**
```
What I'm working on now
```

**Heading**
```
Interfaces that don't make people think twice.
```

**Paragraph 1**
```
Responsive layouts, reusable components, and clean API integration are the
parts of web development I keep coming back to. But what has been pulling my
attention lately is the space between the interface and the data behind it.
How they talk to each other, and what breaks when they stop doing that well.
```

**Paragraph 2**
```
Authentication taught me a lot about that. So did trying to make a language
model do something genuinely useful with unstructured industrial logs. Both
problems look manageable from the outside and get complicated fast once you
are actually inside them.
```

---

## Section: Learning With Other People

**Label**
```
Outside the project work
```

**Heading**
```
Learning with other people.
```

**Paragraph 1**
```
At Chevalier Lab I joined a Laravel study group. Laravel was not my main stack
at the time, but learning it alongside other people in a structured setting
showed me how much faster things click when you can ask a question out loud
and hear someone else's reasoning in return.
```

**Paragraph 2**
```
In HIMA RPLA I served in the advocacy department for D3 Application Software
Engineering students. The work was mostly listening. Students would come in
with a complaint, and learning to figure out what they actually needed versus
what they said they needed turned out to be its own kind of skill.
```

---

## Education Sidebar

**Entry 1**
```
period: 2024 - 2026
degree: Bachelor of Informatics
institution: Telkom University
gpa: GPA 3.50/4.00
```

**Entry 2**
```
period: 2021 - 2024
degree: Diploma in Software Application Engineering
institution: Telkom University
gpa: GPA 3.67/4.00
```

**CTA**
```
My education
```

---
---

# PAGE: /experience

---

## Meta

```
title: Experience | Sakha Wibisono
description: Three internships, one bootcamp cohort, and several things that
were not in any syllabus.
```

---

## Tagline

```
Learning on the job
```

---

## Heading

```
Where I've worked.
```

---

## Sub-copy

```
Three internships, one bootcamp cohort, and several things that were not in
any syllabus.
```

---

## Entry 1: Perum Peruri

```
role: Programmer Intern
company: Perum Peruri
period: Mar 2026 - Jun 2026
location: Jakarta Selatan, DKI Jakarta
type: Internship
```

**Paragraph 1**
```
I came in with solid frontend experience. I left with a real understanding of
how OAuth 2.0 and OpenID Connect actually behave when something goes wrong in
production.
```

**Paragraph 2**
```
My job was building the SSO frontend module using Astro and Vue.js with a
hybrid SSR and SPA architecture. That covered token exchange, refresh token
logic, session management, and access protection for expired or unauthorized
states. I also built the reusable UI components the rest of the system would
depend on for consistency going forward. It was the most consequential work
I had done up to that point.
```

**Tech stack tags**
```
Astro, Vue.js, OAuth 2.0, OpenID Connect, SSR, SPA
```

---

## Entry 2: Asah Ied by Dicoding

```
role: Programmer Apprentice
company: Cohort React & Backend - Asah Ied by Dicoding
period: Aug 2025 - Jan 2026
location: Remote
type: Apprenticeship
```

**Paragraph 1**
```
This cohort ran more like a real team than a training program. I led the React
frontend for a predictive lead scoring application in a banking context and
also handled the backend integration side of things.
```

**Paragraph 2**
```
The backend ran on Supabase. I managed database design, authentication and
authorization layers, and the connection to the ML model powering the score.
We worked in Agile sprints. I sliced designs into high-fidelity React
dashboards for both the sales and admin views, and wrote technical
documentation that the next person to touch the codebase would actually
find useful.
```

**Tech stack tags**
```
React, Supabase, Machine Learning, Agile, ERD, UI Slicing
```

---

## Entry 3: PuTI Telkom University

```
role: Programmer Intern
company: Direktorat Pusat Teknologi Informasi (PuTI) - Telkom University
period: Feb 2024 - Aug 2024
location: Bandung, Jawa Barat
type: Internship
```

**Paragraph 1**
```
My first internship, and the one that showed me how different production code
is from anything I had written for a class assignment.
```

**Paragraph 2**
```
I worked as a frontend developer at the Directorate of PuTI, contributing to
the university's internal academic information system. Using AngularJS, I built
and maintained UI components for the T-Feeder application and helped integrate
it with Neo Feeder PDDIKTI. That last part required close coordination with
backend teams and a solid grasp of how the API-based data synchronization
holding the integration together actually worked.
```

**Tech stack tags**
```
AngularJS, API Integration, PDDIKTI, Academic Systems
```

---

## Entry 4: Chevalier Lab

```
role: Cohort Web Developer
company: Chevalier Lab
period: Jan 2023 - Jun 2023
location: Bandung, Jawa Barat
type: Organizational / Study Group
```

**Paragraph 1**
```
A technical study group centered on Laravel. I joined to fill a gap in my
understanding of backend architecture and how production systems are actually
structured.
```

**Paragraph 2**
```
Sessions covered system design, backend logic, and database management through
case studies and hands-on implementation. Beyond the technology itself, I got
noticeably better at learning in a group setting, asking questions that were
actually useful, and explaining my own reasoning clearly to other people.
```

**Tech stack tags**
```
Laravel, PHP, System Architecture, Database Management
```

---
---

# PAGE: /contact

---

## Meta

```
title: Contact | Sakha Wibisono
description: Have a role or project in mind? Or just a question about something
I've built? Send a message and I will get back to you.
```

---

## Tagline

```
My inbox is open
```

---

## Heading

```
Let's talk.
```

---

## Sub-copy

```
Have a role in mind, a project that needs someone, or a question about
something in my portfolio? I read everything that comes in. Send a message
and I will get back to you.
```

---

## Contact Info Block

**Email**
```
label: Email
value: sakhawibisono77@gmail.com
```

**Phone**
```
label: Phone
value: +62 896-1404-0447
```

**LinkedIn**
```
label: Elsewhere
link_text: Connect on LinkedIn
url: https://linkedin.com/in/sakha-wibisono/
```

**Language note**
```
Indonesian or English, either works fine.
```

---

## Section: Form

**Label**
```
A good place to start
```

**Heading**
```
Tell me what you're working on.
```

**Body**
```
You do not need to have everything figured out. A brief description of the
role or project is enough to start a real conversation. I am happy to share
more about my own work too if that helps.
```

---

## Form Fields

```
field: Your name
placeholder: e.g. Budi Santoso
required: true
```

```
field: Email address
placeholder: you@example.com
required: true
```

```
field: Subject
placeholder: What is this about?
required: false
```

```
field: Your message
placeholder: Tell me a bit about what you are working on...
required: true
```

```
submit_button: Send message
```