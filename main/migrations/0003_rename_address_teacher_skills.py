# Generated by Django 4.2.11 on 2024-05-03 11:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_alter_course_options_alter_coursecategory_options_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='teacher',
            old_name='skills',
            new_name='skills',
        ),
    ]
