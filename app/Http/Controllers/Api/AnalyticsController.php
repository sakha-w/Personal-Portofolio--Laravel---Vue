<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PageView;
use Illuminate\Http\Request;

class AnalyticsController extends Controller
{
    /**
     * Record a page view (data minimization: page, referrer, user agent only).
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'page' => ['required', 'string', 'max:255'],
            'referrer' => ['nullable', 'string', 'max:2048'],
        ]);

        PageView::create([
            'page' => $validated['page'],
            'referrer' => $validated['referrer'] ?? null,
            'user_agent' => substr($request->userAgent() ?? '', 0, 1000),
        ]);

        return response()->json(['success' => true], 201);
    }

    /**
     * Basic analytics summary for the admin dashboard.
     */
    public function stats()
    {
        $totalViews = PageView::count();
        $uniquePages = PageView::distinct('page')->count('page');

        $popularPages = PageView::selectRaw('page, COUNT(*) as views')
            ->groupBy('page')
            ->orderByDesc('views')
            ->limit(10)
            ->get();

        $viewsOverTime = PageView::selectRaw('DATE(created_at) as date, COUNT(*) as views')
            ->groupBy('date')
            ->orderBy('date')
            ->limit(30)
            ->get();

        return response()->json([
            'data' => [
                'total_views' => $totalViews,
                'unique_pages' => $uniquePages,
                'popular_pages' => $popularPages,
                'views_over_time' => $viewsOverTime,
            ],
        ]);
    }
}
