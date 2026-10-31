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
            ['name' => 'SSR', 'category' => 'frontend'],
            ['name' => 'SPA', 'category' => 'frontend'],
            ['name' => 'UI Slicing', 'category' => 'frontend'],
            // backend
            ['name' => 'Laravel', 'category' => 'backend'],
            ['name' => 'PHP', 'category' => 'backend'],
            ['name' => 'REST API', 'category' => 'backend'],
            ['name' => 'Supabase', 'category' => 'backend'],
            ['name' => 'OAuth 2.0', 'category' => 'backend'],
            ['name' => 'OpenID Connect', 'category' => 'backend'],
            ['name' => 'API Integration', 'category' => 'backend'],
            ['name' => 'System Architecture', 'category' => 'backend'],
            ['name' => 'Database Management', 'category' => 'backend'],
            // data
            ['name' => 'Python', 'category' => 'data'],
            ['name' => 'Machine Learning', 'category' => 'data'],
            ['name' => 'Generative AI', 'category' => 'data'],
            ['name' => 'Process Mining', 'category' => 'data'],
            ['name' => 'MySQL', 'category' => 'data'],
            // other
            ['name' => 'Agile', 'category' => 'other'],
            ['name' => 'ERD', 'category' => 'other'],
            ['name' => 'PDDIKTI', 'category' => 'other'],
            ['name' => 'Academic Systems', 'category' => 'other'],
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
                'position' => 'Programmer Intern',
                'location' => 'Jakarta Selatan, DKI Jakarta',
                'start_date' => '2026-03-01',
                'end_date' => '2026-06-30',
                'description' => "I came in with solid frontend experience. I left with a real understanding of how OAuth 2.0 and OpenID Connect actually behave when something goes wrong in production.\n\nMy job was building the SSO frontend module using Astro and Vue.js with a hybrid SSR and SPA architecture. That covered token exchange, refresh token logic, session management, and access protection for expired or unauthorized states. I also built the reusable UI components the rest of the system would depend on for consistency going forward. It was the most consequential work I had done up to that point.",
                'featured' => true,
                'technologies' => ['Astro', 'Vue.js', 'OAuth 2.0', 'OpenID Connect', 'SSR', 'SPA'],
            ],
            [
                'company' => 'Cohort React & Backend - Asah Ied by Dicoding',
                'position' => 'Programmer Apprentice',
                'location' => 'Remote',
                'start_date' => '2025-08-01',
                'end_date' => '2026-01-31',
                'description' => "This cohort ran more like a real team than a training program. I led the React frontend for a predictive lead scoring application in a banking context and also handled the backend integration side of things.\n\nThe backend ran on Supabase. I managed database design, authentication and authorization layers, and the connection to the ML model powering the score. We worked in Agile sprints. I sliced designs into high-fidelity React dashboards for both the sales and admin views, and wrote technical documentation that the next person to touch the codebase would actually find useful.",
                'featured' => true,
                'technologies' => ['React', 'Supabase', 'Machine Learning', 'Agile', 'ERD', 'UI Slicing'],
            ],
            [
                'company' => 'Direktorat Pusat Teknologi Informasi (PuTI) - Telkom University',
                'position' => 'Programmer Intern',
                'location' => 'Bandung, Jawa Barat',
                'start_date' => '2024-02-01',
                'end_date' => '2024-08-31',
                'description' => "My first internship, and the one that showed me how different production code is from anything I had written for a class assignment.\n\nI worked as a frontend developer at the Directorate of PuTI, contributing to the university's internal academic information system. Using AngularJS, I built and maintained UI components for the T-Feeder application and helped integrate it with Neo Feeder PDDIKTI. That last part required close coordination with backend teams and a solid grasp of how the API-based data synchronization holding the integration together actually worked.",
                'featured' => true,
                'technologies' => ['AngularJS', 'API Integration', 'PDDIKTI', 'Academic Systems'],
            ],
            [
                'company' => 'Chevalier Lab',
                'position' => 'Cohort Web Developer',
                'location' => 'Bandung, Jawa Barat',
                'start_date' => '2023-01-01',
                'end_date' => '2023-06-30',
                'description' => "A technical study group centered on Laravel. I joined to fill a gap in my understanding of backend architecture and how production systems are actually structured.\n\nSessions covered system design, backend logic, and database management through case studies and hands-on implementation. Beyond the technology itself, I got noticeably better at learning in a group setting, asking questions that were actually useful, and explaining my own reasoning clearly to other people.",
                'featured' => true,
                'technologies' => ['Laravel', 'PHP', 'System Architecture', 'Database Management'],
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
