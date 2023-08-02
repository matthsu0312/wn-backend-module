<?php namespace Backend\Database\Seeds;

use Seeder;
use Backend\Models\User;
use Backend\Models\UserRole;
use Backend\Models\UserGroup;

class SeedSetupAdmin extends Seeder
{
    public static $email = 'admin@example.com';
    public static $login = 'admin';
    public static $password = 'admin';
    public static $firstName = 'Admin';
    public static $lastName = 'Greattree X WinterCMS';

    public function setDefaults($values)
    {
        if (!is_array($values)) {
            return;
        }
        foreach ($values as $attribute => $value) {
            static::$$attribute = $value;
        }
    }

    public function run()
    {
        $publisher_role = UserRole::create([
            'name' => '文章管理者',
            'code' => UserRole::CODE_PUBLISHER,
            'description' => 'Site editor with access to publishing tools. 系統預設:權限無法另外調整 ',
        ]);

        $developer_role = UserRole::create([
            'name' => '網站開發人員',
            'code' => UserRole::CODE_DEVELOPER,
            'description' => 'Site administrator with access to developer tools. 系統預設:權限無法另外調整 ',
        ]);

        $group = UserGroup::create([
            'name' => 'Owners',
            'code' => UserGroup::CODE_OWNERS,
            'description' => 'Default group for website owners.',
            'is_new_user_default' => false
        ]);

        $user = User::create([
            'email'                 => static::$email,
            'login'                 => static::$login,
            'password'              => static::$password,
            'password_confirmation' => static::$password,
            'first_name'            => static::$firstName,
            'last_name'             => static::$lastName,
            'permissions'           => [],
            'is_superuser'          => true,
            'is_activated'          => true,
            'role_id'               => $developer_role->id
        ]);
        $user->addGroup($group);

        $user2 = User::create([
            'email'                 => 'user01@exmaple.com',
            'login'                 => 'user01',
            'password'              => 'user01',
            'password_confirmation' => 'user01',
            'first_name'            => 'User01',
            'last_name'             => 'website default',
            'permissions'           => [],
            'is_superuser'          => false,
            'is_activated'          => true,
            'role_id'               => $publisher_role->id
        ]);

        $user2->addGroup($group);
    }
}
