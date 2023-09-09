<?php

use Illuminate\Database\Migrations\Migration;

class RenameColumnInUsers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('ALTER TABLE users RENAME COLUMN "parentName" TO parent_name');
        DB::statement('ALTER TABLE users RENAME COLUMN "childName" TO child_name');
        DB::statement('ALTER TABLE users RENAME COLUMN "childName2" TO child_name2');
        DB::statement('ALTER TABLE users RENAME COLUMN "coursePlan" TO course_plan');
        DB::statement('ALTER TABLE users RENAME COLUMN "userAgent" TO user_agent');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement('ALTER TABLE users RENAME COLUMN parent_name TO "parentName"');
        DB::statement('ALTER TABLE users RENAME COLUMN child_name TO "childName"');
        DB::statement('ALTER TABLE users RENAME COLUMN child_name2 TO "childName2"');
        DB::statement('ALTER TABLE users RENAME COLUMN course_plan TO "coursePlan"');
        DB::statement('ALTER TABLE users RENAME COLUMN user_agent TO "userAgent"');
    }
}
