<?php
header('Content-Type: text/html; charset=utf-8');

$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $teacher = $_POST['teacher'] ?? '';
    $description = $_POST['description'] ?? '';
    $group = $_POST['group'] ?? '';
    $credits = $_POST['credits'] ?? '';

    if (empty($name)) {
        $errors['name'] = 'Името на предмета е задължително!';
    } else {
        $nameLength = mb_strlen($name, 'UTF-8');
        if ($nameLength < 2 || $nameLength > 150) {
            $errors['name'] = 'Името на предмета трябва да е между 2 и 150 символа!';
        }
    }

    if (empty($teacher)) {
        $errors['teacher'] = 'Името на преподавателя е задължително!';
    } else {
        $teacherLength = mb_strlen($teacher, 'UTF-8');
        if ($teacherLength < 3 || $teacherLength > 200) {
            $errors['teacher'] = 'Името на преподавателя трябва да е между 3 и 200 символа!';
        }
    }

    if (empty($description)) {
        $errors['description'] = 'Описанието е задължително!';
    } else {
        $descriptionLength = mb_strlen($description, 'UTF-8');
        if ($descriptionLength < 10) {
            $errors['description'] = 'Описанието трябва да е с дължина поне 10 символа, а вие сте въвели ' . $descriptionLength;
        }
    }

    if (empty($group)) {
        $errors['group'] = 'Групата е задължително!';
    } else {
        $validGroups = ['М', 'ПМ', 'ОКН', 'ЯКН'];
        if (!in_array($group, $validGroups)) {
            $errors['group'] = 'Невалидна група, изберете една от М, ПМ, ОКН и ЯКН';
        }
    }

    if (empty($credits)) {
        $errors['credits'] = 'Кредитите са задължително!';
    } else {
        if (!is_numeric($credits) || $credits <= 0 || !is_int((int)$credits)) {
            $errors['credits'] = 'Кредитите трябва да са цяло положително число!';
        }
    }

    $response = [
        'success' => empty($errors)
    ];

    if (!empty($errors)) {
        $response['errors'] = $errors;
    }
}

include 'index.html'; 