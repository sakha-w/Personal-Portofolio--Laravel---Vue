<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (! DB::table('experiences')->exists()) {
            return;
        }

        $now = now();
        $technologies = [
            ['name' => 'Astro', 'category' => 'frontend'],
            ['name' => 'Vue.js', 'category' => 'frontend'],
            ['name' => 'React', 'category' => 'frontend'],
            ['name' => 'AngularJS', 'category' => 'frontend'],
            ['name' => 'SSR', 'category' => 'frontend'],
            ['name' => 'SPA', 'category' => 'frontend'],
            ['name' => 'UI Slicing', 'category' => 'frontend'],
            ['name' => 'Laravel', 'category' => 'backend'],
            ['name' => 'PHP', 'category' => 'backend'],
            ['name' => 'Supabase', 'category' => 'backend'],
            ['name' => 'OAuth 2.0', 'category' => 'backend'],
            ['name' => 'OpenID Connect', 'category' => 'backend'],
            ['name' => 'API Integration', 'category' => 'backend'],
            ['name' => 'System Architecture', 'category' => 'backend'],
            ['name' => 'Database Management', 'category' => 'backend'],
            ['name' => 'Machine Learning', 'category' => 'data'],
            ['name' => 'Agile', 'category' => 'other'],
            ['name' => 'ERD', 'category' => 'other'],
            ['name' => 'PDDIKTI', 'category' => 'other'],
            ['name' => 'Academic Systems', 'category' => 'other'],
        ];

        DB::table('technologies')->insertOrIgnore(
            collect($technologies)->map(fn (array $technology) => [
                ...$technology,
                'slug' => Str::slug($technology['name']),
                'created_at' => $now,
                'updated_at' => $now,
            ])->all()
        );

        $technologyIds = DB::table('technologies')->pluck('id', 'name');
        $experiences = [
            [
                'match' => ['company' => 'Perum Peruri'],
                'company' => 'Perum Peruri',
                'position' => 'Programmer Intern',
                'location' => 'Jakarta Selatan, DKI Jakarta',
                'start_date' => '2026-03-01',
                'end_date' => '2026-06-30',
                'description' => "I came in with solid frontend experience. I left with a real understanding of how OAuth 2.0 and OpenID Connect actually behave when something goes wrong in production.\n\nMy job was building the SSO frontend module using Astro and Vue.js with a hybrid SSR and SPA architecture. That covered token exchange, refresh token logic, session management, and access protection for expired or unauthorized states. I also built the reusable UI components the rest of the system would depend on for consistency going forward. It was the most consequential work I had done up to that point.",
                'technologies' => ['Astro', 'Vue.js', 'OAuth 2.0', 'OpenID Connect', 'SSR', 'SPA'],
            ],
            [
                'match' => ['company' => 'Asah Ied by Dicoding'],
                'company' => 'Cohort React & Backend - Asah Ied by Dicoding',
                'position' => 'Programmer Apprentice',
                'location' => 'Remote',
                'start_date' => '2025-08-01',
                'end_date' => '2026-01-31',
                'description' => "This cohort ran more like a real team than a training program. I led the React frontend for a predictive lead scoring application in a banking context and also handled the backend integration side of things.\n\nThe backend ran on Supabase. I managed database design, authentication and authorization layers, and the connection to the ML model powering the score. We worked in Agile sprints. I sliced designs into high-fidelity React dashboards for both the sales and admin views, and wrote technical documentation that the next person to touch the codebase would actually find useful.",
                'technologies' => ['React', 'Supabase', 'Machine Learning', 'Agile', 'ERD', 'UI Slicing'],
            ],
            [
                'match' => ['company' => 'Direktorat PuTI Telkom University'],
                'company' => 'Direktorat Pusat Teknologi Informasi (PuTI) - Telkom University',
                'position' => 'Programmer Intern',
                'location' => 'Bandung, Jawa Barat',
                'start_date' => '2024-02-01',
                'end_date' => '2024-08-31',
                'description' => "My first internship, and the one that showed me how different production code is from anything I had written for a class assignment.\n\nI worked as a frontend developer at the Directorate of PuTI, contributing to the university's internal academic information system. Using AngularJS, I built and maintained UI components for the T-Feeder application and helped integrate it with Neo Feeder PDDIKTI. That last part required close coordination with backend teams and a solid grasp of how the API-based data synchronization holding the integration together actually worked.",
                'technologies' => ['AngularJS', 'API Integration', 'PDDIKTI', 'Academic Systems'],
            ],
            [
                'match' => ['company' => 'Chevalier Lab'],
                'company' => 'Chevalier Lab',
                'position' => 'Cohort Web Developer',
                'location' => 'Bandung, Jawa Barat',
                'start_date' => '2023-01-01',
                'end_date' => '2023-06-30',
                'description' => "A technical study group centered on Laravel. I joined to fill a gap in my understanding of backend architecture and how production systems are actually structured.\n\nSessions covered system design, backend logic, and database management through case studies and hands-on implementation. Beyond the technology itself, I got noticeably better at learning in a group setting, asking questions that were actually useful, and explaining my own reasoning clearly to other people.",
                'technologies' => ['Laravel', 'PHP', 'System Architecture', 'Database Management'],
            ],
        ];

        foreach ($experiences as $experience) {
            $data = collect($experience)->except(['match', 'technologies'])->all();
            $record = DB::table('experiences')->where($experience['match'])->first();
            if ($record) {
                DB::table('experiences')->where('id', $record->id)->update([...$data, 'updated_at' => $now]);
                $experienceId = $record->id;
            } else {
                $experienceId = DB::table('experiences')->insertGetId([...$data, 'featured' => true, 'created_at' => $now, 'updated_at' => $now]);
            }

            DB::table('experience_technologies')->where('experience_id', $experienceId)->delete();
            DB::table('experience_technologies')->insert(
                collect($experience['technologies'])->map(fn (string $name) => [
                    'experience_id' => $experienceId,
                    'technology_id' => $technologyIds[$name],
                    'created_at' => $now,
                    'updated_at' => $now,
                ])->all()
            );
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Portfolio copy is not reverted because prior records may have been edited.
    }
};
