<template>
  <div class="min-h-screen bg-slate-50 text-slate-800 pb-16">
    <!-- Top Navigation / Banner -->
    <header class="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <n-avatar
            round
            size="medium"
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=SakhaWibisono"
            fallback-src="https://07.img.avito.st/640x480/10577717707.jpg"
          />
          <div>
            <h1 class="font-bold text-slate-900 text-lg leading-tight">Sakha Wibisono</h1>
            <p class="text-xs text-slate-500">Informatics Fresh Graduate & Software Engineer</p>
          </div>
        </div>
        <div class="flex items-center space-x-3">
          <n-tag type="success" round size="small">
            <template #icon>
              <span class="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
            </template>
            Open to Opportunities
          </n-tag>
          <n-button type="primary" size="small" @click="showContactModal = true">
            Contact Me
          </n-button>
        </div>
      </div>
    </header>

    <!-- Main Dashboard Container -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <!-- Hero Profile Summary Card -->
      <n-card class="mb-8 shadow-sm rounded-xl border border-slate-200 bg-gradient-to-r from-slate-900 to-indigo-950 text-white">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center py-4 px-2">
          <div class="lg:col-span-2 space-y-4">
            <div class="flex items-center space-x-2">
              <n-tag type="info" size="small" round>Bachelor of Informatics '26</n-tag>
              <n-tag type="warning" size="small" round>Telkom University</n-tag>
            </div>
            <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Frontend Development, React & Modern Web Technologies
            </h2>
            <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
              Fresh graduate in Informatics from Telkom University with hands-on experience in software development through internships and organizational activities. Proficient in Frontend Development, JavaScript, ReactJS, API Integration, and modern web development technologies.
            </p>
            <div class="flex flex-wrap gap-3 pt-2">
              <n-button type="primary" ghost color="#ffffff" @click="downloadResume">
                Download Resume
              </n-button>
              <n-button text color="#94a3b8" tag="a" href="https://github.com/sakha-wibisono" target="_blank">
                GitHub Profile ↗
              </n-button>
              <n-button text color="#94a3b8" tag="a" href="https://linkedin.com/in/sakha-wibisono" target="_blank">
                LinkedIn ↗
              </n-button>
            </div>
          </div>

          <!-- Quick Stats Grid -->
          <div class="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/10 space-y-4">
            <h3 class="text-xs uppercase tracking-wider text-slate-400 font-semibold">Academic & Career Metrics</h3>
            <div class="grid grid-cols-2 gap-4">
              <n-statistic label="Bachelor GPA" value="3.50" precision="2">
                <template #suffix>/ 4.0</template>
              </n-statistic>
              <n-statistic label="Diploma GPA" value="3.67" precision="2">
                <template #suffix>/ 4.0</template>
              </n-statistic>
              <n-statistic label="Internships" value="3" />
              <n-statistic label="Certifications" value="5" />
            </div>
          </div>
        </div>
      </n-card>

      <!-- Dashboard Navigation Tabs -->
      <n-tabs type="segment" default-value="overview" size="large" class="custom-tabs">
        <!-- TAB 1: OVERVIEW -->
        <n-tab-pane name="overview" tab="Overview">
          <div class="space-y-8 mt-6">
            <!-- Education & Highlights -->
            <n-grid x-gap="20" y-gap="20" :cols="12">
              <n-gi :span="12" :l="8">
                <n-card title="Education Background" class="h-full shadow-xs rounded-xl">
                  <div class="space-y-4">
                    <div class="border-l-2 border-indigo-600 pl-4 space-y-1">
                      <h4 class="font-bold text-slate-900 text-base">Bachelor of Informatics (GPA 3.50/4.00)</h4>
                      <p class="text-sm font-medium text-indigo-600">Telkom University (2024 - 2026)</p>
                      <p class="text-xs text-slate-500">Extension program from Diploma. Thesis: Utilization of Generative AI for Process Discovery in Operational Maintenance Data Electric Power Company</p>
                    </div>
                    <div class="border-l-2 border-emerald-600 pl-4 space-y-1">
                      <h4 class="font-bold text-slate-900 text-base">Diploma in Software Application Engineering (GPA 3.67/4.00)</h4>
                      <p class="text-sm font-medium text-emerald-600">Telkom University (2021 - 2024)</p>
                      <p class="text-xs text-slate-500">Thesis: MedRecordX - Patient Medical Record Application (Case Study: Telagasari Azimat Clinic)</p>
                    </div>
                    <div class="bg-slate-50 p-4 rounded-lg space-y-2">
                      <span class="text-xs font-semibold text-slate-600 uppercase tracking-wider">Key Tech & Tools</span>
                      <div class="flex flex-wrap gap-1.5 pt-1">
                        <n-tag size="small" :bordered="false">JavaScript</n-tag>
                        <n-tag size="small" :bordered="false">ReactJS</n-tag>
                        <n-tag size="small" :bordered="false">Vue.js</n-tag>
                        <n-tag size="small" :bordered="false">Python</n-tag>
                        <n-tag size="small" :bordered="false">PHP</n-tag>
                        <n-tag size="small" :bordered="false">MySQL</n-tag>
                      </div>
                    </div>
                  </div>
                </n-card>
              </n-gi>

              <n-gi :span="12" :l="4">
                <n-card title="Core Competencies" class="h-full shadow-xs rounded-xl">
                  <div class="space-y-3">
                    <div>
                      <div class="flex justify-between text-xs mb-1 font-medium text-slate-700">
                        <span>Frontend (Vue / React / TS)</span>
                        <span>92%</span>
                      </div>
                      <n-progress type="line" :percentage="92" :show-indicator="false" color="#6366f1" />
                    </div>
                    <div>
                      <div class="flex justify-between text-xs mb-1 font-medium text-slate-700">
                        <span>Backend (Node / Python / SQL)</span>
                        <span>88%</span>
                      </div>
                      <n-progress type="line" :percentage="88" :show-indicator="false" color="#8b5cf6" />
                    </div>
                    <div>
                      <div class="flex justify-between text-xs mb-1 font-medium text-slate-700">
                        <span>Cloud & DevOps (Docker / Git)</span>
                        <span>80%</span>
                      </div>
                      <n-progress type="line" :percentage="80" :show-indicator="false" color="#ec4899" />
                    </div>
                    <div>
                      <div class="flex justify-between text-xs mb-1 font-medium text-slate-700">
                        <span>System Architecture</span>
                        <span>85%</span>
                      </div>
                      <n-progress type="line" :percentage="85" :show-indicator="false" color="#06b6d4" />
                    </div>
                  </div>
                </n-card>
              </n-gi>
            </n-grid>

            <!-- Featured Projects Spotlight -->
            <div>
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-bold text-slate-900">Featured Capstone Projects (Fetched via API)</h3>
              </div>
              <n-grid x-gap="20" y-gap="20" :cols="12">
                <n-gi v-for="proj in featuredProjects" :key="proj.title" :span="12" :m="6" :l="4">
                  <n-card hoverable class="h-full flex flex-col justify-between shadow-xs rounded-xl border border-slate-200">
                    <div class="space-y-3">
                      <div class="flex justify-between items-start">
                        <n-tag :type="proj.typeColor" size="small">{{ proj.category }}</n-tag>
                        <span class="text-xs text-slate-400">{{ proj.year }}</span>
                      </div>
                      <h4 class="font-bold text-slate-900 text-base">{{ proj.title }}</h4>
                      <p class="text-xs text-slate-600 leading-relaxed">{{ proj.description }}</p>
                    </div>
                    <div class="pt-4 mt-4 border-t border-slate-100 space-y-3">
                      <div class="flex flex-wrap gap-1">
                        <n-tag v-for="tech in proj.techs" :key="tech" size="tiny" type="default" ghost>{{ tech }}</n-tag>
                      </div>
                      <div class="flex justify-between items-center pt-1">
                        <n-button text tag="a" :href="proj.github" target="_blank" size="small">GitHub ↗</n-button>
                        <n-button type="primary" ghost size="tiny" tag="a" :href="proj.demo" target="_blank">Live Demo</n-button>
                      </div>
                    </div>
                  </n-card>
                </n-gi>
              </n-grid>
            </div>
          </div>
        </n-tab-pane>

        <!-- TAB 2: PROJECTS PORTFOLIO -->
        <n-tab-pane name="projects" tab="Projects Portfolio">
          <div class="space-y-6 mt-6">
            <div class="flex flex-wrap gap-2 items-center justify-between">
              <h3 class="text-xl font-bold text-slate-900">All Backend-Connected Projects</h3>
              <div class="flex gap-2">
                <n-button
                  v-for="cat in categories"
                  :key="cat"
                  size="small"
                  :type="selectedCategory === cat ? 'primary' : 'default'"
                  @click="selectedCategory = cat"
                >
                  {{ cat }}
                </n-button>
              </div>
            </div>

            <n-grid x-gap="20" y-gap="20" :cols="12">
              <n-gi v-for="proj in filteredProjects" :key="proj.title" :span="12" :m="6" :l="4">
                <n-card class="h-full flex flex-col justify-between shadow-xs rounded-xl border border-slate-200" hoverable>
                  <div class="space-y-3">
                    <div class="flex justify-between items-center">
                      <n-tag :type="proj.typeColor" size="small">{{ proj.category }}</n-tag>
                      <span class="text-xs text-slate-400 font-mono">{{ proj.metrics }}</span>
                    </div>
                    <h4 class="font-bold text-slate-900 text-lg">{{ proj.title }}</h4>
                    <p class="text-xs text-slate-600 leading-relaxed">{{ proj.description }}</p>
                    <ul class="text-xs text-slate-500 space-y-1 list-disc list-inside pt-1" v-if="proj.highlights">
                      <li v-for="hl in proj.highlights" :key="hl">{{ hl }}</li>
                    </ul>
                  </div>
                  <div class="pt-4 mt-4 border-t border-slate-100 space-y-3">
                    <div class="flex flex-wrap gap-1">
                      <n-tag v-for="tech in proj.techs" :key="tech" size="tiny" type="info" ghost>{{ tech }}</n-tag>
                    </div>
                    <div class="flex justify-end space-x-2 pt-1">
                      <n-button text tag="a" :href="proj.github" target="_blank" size="small">GitHub</n-button>
                      <n-button type="primary" size="small" tag="a" :href="proj.demo" target="_blank">Demo</n-button>
                    </div>
                  </div>
                </n-card>
              </n-gi>
            </n-grid>
          </div>
        </n-tab-pane>

        <!-- TAB 3: SKILLS & EXPERTISE -->
        <n-tab-pane name="skills" tab="Skills & Expertise">
          <div class="space-y-8 mt-6">
            <n-grid x-gap="20" y-gap="20" :cols="12">
              <n-gi :span="12" :l="6">
                <n-card title="Frontend & UI Engineering" class="shadow-xs rounded-xl h-full">
                  <div class="space-y-4">
                    <div v-for="skill in frontendSkills" :key="skill.name">
                      <div class="flex justify-between text-sm mb-1 font-medium text-slate-700">
                        <span>{{ skill.name }}</span>
                        <span class="text-indigo-600">{{ skill.level }}%</span>
                      </div>
                      <n-progress type="line" :percentage="skill.level" :show-indicator="false" color="#6366f1" />
                    </div>
                  </div>
                </n-card>
              </n-gi>

              <n-gi :span="12" :l="6">
                <n-card title="Backend, Database & Cloud" class="shadow-xs rounded-xl h-full">
                  <div class="space-y-4">
                    <div v-for="skill in backendSkills" :key="skill.name">
                      <div class="flex justify-between text-sm mb-1 font-medium text-slate-700">
                        <span>{{ skill.name }}</span>
                        <span class="text-violet-600">{{ skill.level }}%</span>
                      </div>
                      <n-progress type="line" :percentage="skill.level" :show-indicator="false" color="#8b5cf6" />
                    </div>
                  </div>
                </n-card>
              </n-gi>
            </n-grid>

            <n-card title="Technologies, Tools & Frameworks Ecosystem" class="shadow-xs rounded-xl">
              <div class="flex flex-wrap gap-2">
                <n-tag v-for="tool in allTools" :key="tool" type="success" size="medium" round>
                  {{ tool }}
                </n-tag>
              </div>
            </n-card>
          </div>
        </n-tab-pane>

        <!-- TAB 4: EXPERIENCE & TIMELINE -->
        <n-tab-pane name="experience" tab="Experience & Leadership">
          <div class="max-w-3xl mx-auto mt-6 bg-white p-8 rounded-xl shadow-xs border border-slate-200">
            <h3 class="text-xl font-bold text-slate-900 mb-6">Experience & Academic Milestones</h3>
            <n-timeline>
              <n-timeline-item
                type="success"
                title="Programmer Internship"
                content="Perum Peruri (Jakarta Selatan)"
                time="Mar 2026 - Jun 2026"
              >
                <template #default>
                  <p class="text-xs text-slate-600 mt-1">
                    Developing Astro and Vue.js-based SSO frontend with a hybrid architecture (SSR + SPA). Implementing OAuth 2.0 and OpenID Connect (OIDC) API integrations, token exchange, refresh tokens, and access protection.
                  </p>
                </template>
              </n-timeline-item>

              <n-timeline-item
                type="info"
                title="Programmer Apprenticeship (Cohort React & Backend)"
                content="Asah Ied by Dicoding (Remote)"
                time="Aug 2025 - Jan 2026"
              >
                <template #default>
                  <p class="text-xs text-slate-600 mt-1">
                    Led React frontend and backend integration for a predictive lead scoring web application. Architected backend using Supabase, managing cloud database design, authentication, and ML model integration.
                  </p>
                </template>
              </n-timeline-item>

              <n-timeline-item
                type="warning"
                title="Programmer Internship"
                content="Direktorat PuTI Telkom University (Bandung)"
                time="Feb 2024 - Aug 2024"
              >
                <template #default>
                  <p class="text-xs text-slate-600 mt-1">
                    Contributed as Frontend Developer to internal academic system. Developed UI for T-Feeder application using AngularJS and supported Neo Feeder PDDIKTI integration with API-based data synchronization.
                  </p>
                </template>
              </n-timeline-item>

              <n-timeline-item
                type="success"
                title="Cohort Web Developer"
                content="Chevalier Lab (Bandung)"
                time="Jan 2023 - Jun 2023"
              >
                <template #default>
                  <p class="text-xs text-slate-600 mt-1">
                    Engaged in technical study group on Laravel to deepen understanding of modern web application development, backend logic, and database management.
                  </p>
                </template>
              </n-timeline-item>

              <n-timeline-item
                type="info"
                title="Advocacy Department Staff"
                content="Himpunan Mahasiswa RPLA (Bandung)"
                time="Sep 2022 - Jan 2023"
              >
                <template #default>
                  <p class="text-xs text-slate-600 mt-1">
                    Advocated for D3 Application Software Engineering students by providing services, advocacy, and support as a place for complaints.
                  </p>
                </template>
              </n-timeline-item>
            </n-timeline>
          </div>
        </n-tab-pane>

        <!-- TAB 5: CERTIFICATIONS -->
        <n-tab-pane name="certs" tab="Certifications & Awards">
          <div class="space-y-6 mt-6">
            <n-grid x-gap="20" y-gap="20" :cols="12">
              <n-gi v-for="cert in certifications" :key="cert.title" :span="12" :m="6" :l="4">
                <n-card class="h-full shadow-xs rounded-xl border border-slate-200">
                  <div class="space-y-3">
                    <div class="flex justify-between items-center">
                      <n-tag type="success" size="small">{{ cert.issuer }}</n-tag>
                      <span class="text-xs text-slate-400">{{ cert.date }}</span>
                    </div>
                    <h4 class="font-bold text-slate-900 text-base">{{ cert.title }}</h4>
                    <p class="text-xs text-slate-600">{{ cert.description }}</p>
                  </div>
                </n-card>
              </n-gi>
            </n-grid>
          </div>
        </n-tab-pane>
      </n-tabs>
    </main>

    <!-- Contact Modal -->
    <n-modal v-model:show="showContactModal" preset="card" title="Get in Touch with Sakha" class="max-w-lg">
      <n-form ref="contactFormRef" :model="contactForm" :rules="contactRules" class="space-y-4">
        <n-form-item label="Your Name" path="name">
          <n-input v-model:value="contactForm.name" placeholder="Enter your full name" />
        </n-form-item>
        <n-form-item label="Email Address" path="email">
          <n-input v-model:value="contactForm.email" placeholder="name@company.com" />
        </n-form-item>
        <n-form-item label="Subject / Role" path="subject">
          <n-input v-model:value="contactForm.subject" placeholder="Full-time Software Engineer Opportunity" />
        </n-form-item>
        <n-form-item label="Message" path="message">
          <n-input
            v-model:value="contactForm.message"
            type="textarea"
            placeholder="Hi Sakha, we would love to invite you for an interview..."
            :rows="4"
          />
        </n-form-item>
        <div class="flex justify-end space-x-2 pt-2">
          <n-button @click="showContactModal = false">Cancel</n-button>
          <n-button type="primary" :loading="submitting" @click="submitContact">Send Message</n-button>
        </div>
      </n-form>
    </n-modal>

    <!-- Footer -->
    <footer class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-slate-200 text-center text-xs text-slate-500">
      <p>© 2026 Sakha Wibisono. Built with Astro, Vue.js, and Naive UI design system.</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useMessage } from 'naive-ui';

const message = useMessage();
const showContactModal = ref(false);
const selectedCategory = ref('All');
const submitting = ref(false);
const allProjects = ref([]);

const categories = ['All', 'Full Stack', 'AI & ML', 'Systems'];

const contactForm = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const contactRules = {
  name: [{ required: true, message: 'Please enter your name', trigger: 'blur' }],
  email: [{ required: true, message: 'Please enter your email', trigger: 'blur' }],
  message: [{ required: true, message: 'Please enter your message', trigger: 'blur' }]
};

// Fetch projects from backend API route (/api/projects)
onMounted(async () => {
  try {
    const res = await fetch('/api/projects');
    const json = await res.json();
    if (json.success && json.data) {
      allProjects.value = json.data;
    }
  } catch (err) {
    console.error('Failed to load projects from API:', err);
  }
});

const featuredProjects = computed(() => {
  return allProjects.value.slice(0, 3);
});

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'All') return allProjects.value;
  return allProjects.value.filter(p => p.category === selectedCategory.value);
});

const submitContact = async () => {
  if (!contactForm.value.name || !contactForm.value.email || !contactForm.value.message) {
    message.error('Please fill in all required fields.');
    return;
  }

  submitting.value = true;
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactForm.value)
    });
    const json = await res.json();
    if (json.success) {
      message.success(json.message);
      showContactModal.value = false;
      contactForm.value = { name: '', email: '', subject: '', message: '' };
    } else {
      message.error(json.error || 'Failed to send message.');
    }
  } catch (err) {
    message.error('Network error. Please try again later.');
  } finally {
    submitting.value = false;
  }
};

const downloadResume = () => {
  message.info('Downloading Sakha Wibisono resume (PDF)...');
};

const frontendSkills = [
  { name: 'JavaScript / HTML & CSS', level: 95 },
  { name: 'ReactJS / Vue.js', level: 90 },
  { name: 'AngularJS / Astro', level: 85 },
  { name: 'OAuth 2.0 / OIDC & API Integration', level: 88 },
  { name: 'Responsive Web Design', level: 90 }
];

const backendSkills = [
  { name: 'Python / PHP', level: 88 },
  { name: 'Supabase / MySQL', level: 86 },
  { name: 'Node.js / Backend Logic', level: 85 },
  { name: 'Kotlin (Android)', level: 80 },
  { name: 'Data Science & Machine Learning', level: 82 }
];

const allTools = [
  'JavaScript', 'Python', 'PHP', 'Kotlin', 'HTML & CSS', 'ReactJS', 'Vue.js',
  'AngularJS', 'Astro', 'Supabase', 'MySQL', 'Visual Studio Code', 'Android Studio',
  'GitHub', 'Ms. Office', 'Ms. Excel', 'OAuth 2.0', 'OpenID Connect', 'REST APIs', 'Agile'
];

const certifications = [
  {
    issuer: 'Dicoding Indonesia',
    date: '2026',
    title: 'Belajar Machine Learning untuk Pemula',
    description: 'Foundational concepts and implementation of machine learning models.'
  },
  {
    issuer: 'Dicoding Indonesia',
    date: '2025',
    title: 'Belajar Fundamental Back-End dengan Javascript',
    description: 'Core backend development principles and JavaScript server architecture.'
  },
  {
    issuer: 'Dicoding Indonesia',
    date: '2025',
    title: 'Belajar Fundamental Aplikasi Web dengan React',
    description: 'Advanced React development, component architecture, and state management.'
  },
  {
    issuer: 'Dicoding Indonesia',
    date: '2025',
    title: 'Belajar Dasar Cloud dan Gen AI di AWS',
    description: 'Cloud computing fundamentals and Generative AI services on AWS.'
  },
  {
    issuer: 'Coursera',
    date: '2022',
    title: 'IT Support Google',
    description: 'Information technology support, troubleshooting, and system administration.'
  }
];
</script>
