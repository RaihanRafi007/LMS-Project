# Generated by Django 4.2 on 2023-05-12 03:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0016_remove_notification_notif_text_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='notification',
            name='student',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='main.student'),
        ),
        migrations.AddField(
            model_name='notification',
            name='teacher',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='main.teacher'),
        ),
    ]
