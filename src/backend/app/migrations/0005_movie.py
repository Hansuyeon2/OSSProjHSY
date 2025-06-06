# Generated by Django 5.2.1 on 2025-06-02 01:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_book'),
    ]

    operations = [
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('director', models.CharField(blank=True, max_length=255, null=True)),
                ('main_emotion', models.CharField(max_length=50)),
                ('sub_emotions', models.JSONField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
