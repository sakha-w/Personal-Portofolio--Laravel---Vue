<?php

namespace Database\Seeders;

use App\Models\Certificate;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Project;
use App\Models\Technology;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PortfolioSeeder extends Seeder
{
    /**
     * Seed portfolio content from Sakha Wibisono CV.
     */
    public function run(): void
    {
        $technologies = [
            // frontend
            ['name' => 'Astro', 'category' => 'frontend'],
            ['name' => 'Vue.js', 'category' => 'frontend'],
            ['name' => 'React', 'category' => 'frontend'],
            ['name' => 'ReactJS', 'category' => 'frontend'],
            ['name' => 'AngularJS', 'category' => 'frontend'],
            ['name' => 'JavaScript', 'category' => 'frontend'],
            ['name' => 'HTML & CSS', 'category' => 'frontend'],
            // backend
            ['name' => 'Laravel', 'category' => 'backend'],
            ['name' => 'PHP', 'category' => 'backend'],
            ['name' => 'REST API', 'category' => 'backend'],
            ['name' => 'Supabase', 'category' => 'backend'],
            ['name' => 'OAuth 2.0', 'category' => 'backend'],
            ['name' => 'OpenID Connect', 'category' => 'backend'],
            // data
            ['name' => 'Python', 'category' => 'data'],
            ['name' => 'Machine Learning', 'category' => 'data'],
            ['name' => 'Generative AI', 'category' => 'data'],
            ['name' => 'Process Mining', 'category' => 'data'],
            ['name' => 'MySQL', 'category' => 'data'],
            // tools
            ['name' => 'Git', 'category' => 'tools'],
            ['name' => 'GitHub', 'category' => 'tools'],
            ['name' => 'Docker', 'category' => 'tools'],
            ['name' => 'VS Code', 'category' => 'tools'],
            ['name' => 'Kotlin', 'category' => 'tools'],
            ['name' => 'Android Studio', 'category' => 'tools'],
        ];

        $techIds = [];
        foreach ($technologies as $tech) {
            $record = Technology::firstOrCreate(
                ['slug' => Str::slug($tech['name'])],
                ['name' => $tech['name'], 'category' => $tech['category']]
            );
            $techIds[$tech['name']] = $record->id;
        }

        $projects = [
            [
                'title' => 'Predictive Lead Scoring Web App',
                'short_description' => 'Predictive lead scoring web application to support banking sales optimization.',
                'description' => 'Led the React frontend and backend integration for a predictive lead scoring web application to support banking sales optimization. Developed high-fidelity dashboards (sales & admin) using React with a slicing design-to-code approach. Architected the backend using Supabase, managing cloud database design, authentication, authorization, and ML model integration for predictive scoring.',
                'year' => '2025',
                'category' => 'AI / ML',
                'featured' => true,
                'github_url' => 'https://github.com/sakha-wibisono',
                'demo_url' => 'https://linkedin.com/in/sakha-wibisono',
                'technologies' => ['React', 'Supabase', 'Python', 'JavaScript'],
            ],
            [
                'title' => 'SSO Frontend & Authentication System',
                'short_description' => 'Astro and Vue.js-based SSO frontend with hybrid SSR + SPA architecture.',
                'description' => 'Developing an Astro and Vue.js-based SSO frontend with a hybrid architecture (SSR + SPA) for optimal performance and modularity. Implementing complex authentication API integrations using OAuth 2.0 and OpenID Connect, including token exchange, refresh tokens, and session management.',
                'year' => '2026',
                'category' => 'Frontend',
                'featured' => true,
                'github_url' => 'https://github.com/sakha-wibisono',
                'demo_url' => 'https://linkedin.com/in/sakha-wibisono',
                'technologies' => ['Astro', 'Vue.js', 'OAuth 2.0', 'OpenID Connect', 'JavaScript'],
            ],
            [
                'title' => 'MedRecordX — Patient Medical Record App',
                'short_description' => 'Patient medical record application (case study: Telagasari Azimat Clinic).',
                'description' => 'Diploma thesis project: patient medical record application for Telagasari Azimat Clinic, streamlining clinic data workflows with secure clinical data storage and a user-friendly interface for clinic staff.',
                'year' => '2024',
                'category' => 'Full Stack',
                'featured' => true,
                'github_url' => 'https://github.com/sakha-wibisono',
                'demo_url' => 'https://linkedin.com/in/sakha-wibisono',
                'technologies' => ['PHP', 'MySQL', 'JavaScript', 'HTML & CSS'],
            ],
            [
                'title' => 'T-Feeder Academic System',
                'short_description' => 'Internal academic information system at Direktorat PuTI Telkom University.',
                'description' => 'Contributed as Frontend Developer to Telkom University internal academic information system. Developed user interfaces for the T-Feeder application using AngularJS and supported Neo Feeder PDDIKTI integration with API-based data synchronization.',
                'year' => '2024',
                'category' => 'Frontend',
                'featured' => false,
                'github_url' => 'https://github.com/sakha-wibisono',
                'demo_url' => 'https://linkedin.com/in/sakha-wibisono',
                'technologies' => ['AngularJS', 'JavaScript', 'REST API', 'PHP'],
            ],
            [
                'title' => 'Generative AI for Process Discovery',
                'short_description' => 'Utilization of Generative AI for process discovery in operational maintenance data.',
                'description' => 'Bachelor thesis: utilization of Generative AI for process discovery in operational maintenance data of an electric power company, combining process mining algorithms with generative AI analysis on operational maintenance logs.',
                'year' => '2026',
                'category' => 'AI / ML',
                'featured' => true,
                'github_url' => 'https://github.com/sakha-wibisono',
                'demo_url' => 'https://linkedin.com/in/sakha-wibisono',
                'technologies' => ['Python', 'Generative AI', 'Machine Learning', 'Process Mining'],
            ],
        ];

        foreach ($projects as $item) {
            $techNames = $item['technologies'];
            unset($item['technologies']);

            $project = Project::firstOrCreate(
                ['slug' => Str::slug($item['title'])],
                $item
            );

            $project->technologies()->sync(
                collect($techNames)->map(fn ($name) => $techIds[$name])->all()
            );
        }

        $experiences = [
            [
                'company' => 'Perum Peruri',
                'position' => 'Programmer Internship',
                'location' => 'Jakarta Selatan, DKI Jakarta',
                'start_date' => '2026-03-01',
                'end_date' => '2026-06-30',
                'description' => 'Developing Astro and Vue.js-based SSO frontend with hybrid SSR + SPA architecture. Implementing OAuth 2.0 and OpenID Connect integrations, token exchange, refresh tokens, and access protection systems.',
                'featured' => true,
                'technologies' => ['Astro', 'Vue.js', 'OAuth 2.0', 'OpenID Connect'],
            ],
            [
                'company' => 'Asah Ied by Dicoding',
                'position' => 'Programmer Apprenticeship (Cohort React & Backend)',
                'location' => 'Remote',
                'start_date' => '2025-08-01',
                'end_date' => '2026-01-31',
                'description' => 'Led React frontend and backend integration for a predictive lead scoring web application. Architected backend using Supabase with cloud database design, authentication, and ML model integration.',
                'featured' => true,
                'technologies' => ['React', 'Supabase', 'Python', 'JavaScript'],
            ],
            [
                'company' => 'Direktorat PuTI Telkom University',
                'position' => 'Programmer Internship (Frontend Programmer)',
                'location' => 'Bandung, Jawa Barat',
                'start_date' => '2024-02-01',
                'end_date' => '2024-08-31',
                'description' => 'Contributed as Frontend Developer to internal academic information system. Developed T-Feeder UI using AngularJS and supported Neo Feeder PDDIKTI integration with API-based data synchronization.',
                'featured' => true,
                'technologies' => ['AngularJS', 'JavaScript', 'REST API'],
            ],
        ];

        foreach ($experiences as $item) {
            $techNames = $item['technologies'];
            unset($item['technologies']);

            $experience = Experience::firstOrCreate(
                ['company' => $item['company'], 'position' => $item['position']],
                $item
            );

            $experience->technologies()->sync(
                collect($techNames)->map(fn ($name) => $techIds[$name])->all()
            );
        }

        $educations = [
            [
                'degree' => 'Bachelor of Informatics',
                'institution' => 'Telkom University',
                'location' => 'Bandung, Jawa Barat',
                'period' => '2024–2026',
                'gpa' => '3.50/4.00',
                'thesis' => 'Utilization of Generative AI for Process Discovery in Operational Maintenance Data Electric Power Company',
                'description' => 'Extension program from Diploma. Focus on software engineering, data science, and system architecture.',
            ],
            [
                'degree' => 'Diploma in Software Application Engineering',
                'institution' => 'Telkom University',
                'location' => 'Bandung, Jawa Barat',
                'period' => '2021–2024',
                'gpa' => '3.67/4.00',
                'thesis' => 'MedRecordX: Patient Medical Record Application (Case Study: Telagasari Azimat Clinic)',
                'description' => 'Vocational program focused on applied software engineering.',
            ],
        ];

        foreach ($educations as $item) {
            Education::firstOrCreate(
                ['degree' => $item['degree'], 'institution' => $item['institution']],
                $item
            );
        }

        $certificates = [
            [
                'title' => 'Belajar Machine Learning untuk Pemula',
                'issuer' => 'Dicoding Indonesia',
                'year' => '2026',
                'description' => 'Foundational concepts and implementation of machine learning models.',
            ],
            [
                'title' => 'Belajar Fundamental Back-End dengan Javascript',
                'issuer' => 'Dicoding Indonesia',
                'year' => '2025',
                'description' => 'Core backend development principles and JavaScript server architecture.',
            ],
            [
                'title' => 'Belajar Fundamental Aplikasi Web dengan React',
                'issuer' => 'Dicoding Indonesia',
                'year' => '2025',
                'description' => 'Advanced React development, component architecture, and state management.',
            ],
            [
                'title' => 'Belajar Dasar Cloud dan Gen AI di AWS',
                'issuer' => 'Dicoding Indonesia',
                'year' => '2025',
                'description' => 'Cloud computing fundamentals and Generative AI services on AWS.',
            ],
            [
                'title' => 'IT Support Google',
                'issuer' => 'Coursera',
                'year' => '2022',
                'description' => 'IT support, troubleshooting, and system administration.',
            ],
        ];

        foreach ($certificates as $item) {
            Certificate::firstOrCreate(
                ['title' => $item['title'], 'issuer' => $item['issuer']],
                $item
            );
        }
    }
}
