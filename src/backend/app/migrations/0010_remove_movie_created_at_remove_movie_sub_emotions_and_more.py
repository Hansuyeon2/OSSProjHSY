# Generated by Django 5.2.1 on 2025-06-02 08:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0009_remove_diary_emotion_summary_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='movie',
            name='created_at',
        ),
        migrations.RemoveField(
            model_name='movie',
            name='sub_emotions',
        ),
        migrations.AddField(
            model_name='movie',
            name='analysis',
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='movie',
            name='sub_emotion',
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='movie',
            name='main_emotion',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='nightdiary',
            name='sub_emotion',
            field=models.CharField(),
        ),
    ]
