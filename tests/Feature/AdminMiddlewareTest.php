<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminMiddlewareTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_access(): void
    {
        $adminUser = User::factory()->create(['is_admin' => true]);
        $this->actingAs($adminUser);

        // Make a request to a route that uses the middleware
        $response = $this->get(route('phpInfo'));

        // Assert that the response is successful or as expected
        $response->assertSuccessful();
    }

    public function test_non_admin_cannot_access(): void
    {
        $adminUser = User::factory()->create(['is_admin' => false]);
        $this->actingAs($adminUser);

        // Make a request to a route that uses the middleware
        $response = $this->get(route('phpInfo'));

        // Assert that the response is successful or as expected
        $response->assertRedirect();
    }
}
