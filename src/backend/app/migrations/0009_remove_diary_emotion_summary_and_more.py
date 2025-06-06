# Generated by Django 5.2.1 on 2025-06-02 07:13

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0008_alter_diary_created_at'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RemoveField(
            model_name='diary',
            name='emotion_summary',
        ),
        migrations.RemoveField(
            model_name='diary',
            name='summary_analysis',
        ),
        migrations.CreateModel(
            name='NightDiary',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('main_emotion', models.CharField(max_length=20)),
                ('sub_emotion', models.JSONField()),
                ('analysis', models.JSONField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
