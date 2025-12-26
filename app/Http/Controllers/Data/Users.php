<?php

namespace App\Http\Controllers\Data;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class Users extends Controller
{
    public function index()
    {
         return Inertia::render('admin/data/user/index', [
            'users' => User::paginate(10),
        ]);
    }

    public function save (Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $user = new User();
        $user->name = $request->name;
        $user->username = $request->username;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->save();

        return redirect()->route('data.users')->with('success', 'User created successfully.');

    }

    public function update (Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return redirect()->route('data.users')->with('error', 'User not found.');
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users,username,' . $id,
            'email' => 'required|string|email|max:255|unique:users,email,' . $id,
        ]);

        $user->update([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
        ]);

        if ($request->filled('password')) {
            $user->update(['password' => bcrypt($request->password)]);
        }

        return redirect()->route('data.users')->with('success', 'User updated successfully.');
    }

    public function destroy($id)
    {
        $user = User::find($id);
        if ($user) {
            $user->delete();
            return redirect()->route('data.users')->with('success', 'User successfully deleted.');
        }

        return redirect()->route('data.users')->with('error', 'User not found.');
    }
}
