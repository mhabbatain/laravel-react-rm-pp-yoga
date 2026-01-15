<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BerandaTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_the_login_page()
    {
        $this->get(route('beranda'))->assertRedirect(route('login'));
    }

    public function test_authenticated_users_can_visit_the_beranda()
    {
        $this->actingAs($user = User::factory()->create());

        $this->get(route('beranda'))->assertOk();
    }
}
