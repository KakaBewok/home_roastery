<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class FrontEndController extends Controller
{
    public function index()
    {
        return Inertia::render('frontend/index');
    }
}
