# Generated by Django 4.2 on 2023-05-12 16:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0019_quiz_quizquestions_coursequiz'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='QuizQuestions',
            new_name='QuizQuestion',
        ),
    ]
