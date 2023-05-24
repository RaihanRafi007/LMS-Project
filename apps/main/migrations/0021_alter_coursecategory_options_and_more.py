# Generated by Django 4.2 on 2023-05-14 11:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0020_rename_quizquestions_quizquestion'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='coursecategory',
            options={'verbose_name_plural': 'Course categories'},
        ),
        migrations.AlterModelOptions(
            name='coursequiz',
            options={'verbose_name_plural': 'Course quizzes'},
        ),
        migrations.AlterModelOptions(
            name='quiz',
            options={'verbose_name_plural': 'Quizzes'},
        ),
        migrations.AlterModelOptions(
            name='studentcourseenrollment',
            options={'verbose_name_plural': 'Enrolled courses'},
        ),
        migrations.AddField(
            model_name='coursequiz',
            name='teacher',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='main.teacher'),
        ),
    ]
