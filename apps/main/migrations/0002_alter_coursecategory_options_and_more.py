# Generated by Django 4.2 on 2023-04-09 04:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='coursecategory',
            options={'verbose_name_plural': 'Course Categories'},
        ),
        migrations.RenameField(
            model_name='teacher',
            old_name='address',
            new_name='skills',
        ),
    ]
