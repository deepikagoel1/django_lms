# Generated by Django 4.2.11 on 2024-05-25 15:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0014_teacher_profile_img'),
    ]

    operations = [
        migrations.AlterField(
            model_name='teacher',
            name='profile_img',
            field=models.ImageField(null=True, upload_to='teacher_profile_imgs/'),
        ),
    ]
