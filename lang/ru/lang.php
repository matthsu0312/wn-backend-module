<?php

return [
    'field' => [
        'invalid_type' => 'Использован неверный тип поля: :type.',
        'options_method_not_exists' => 'Класс модели :model должен содержать метод :method(), возвращающий опции для поля формы ":field".',
    ],
    'widget' => [
        'not_registered' => "Класс виджета ':name' не зарегистрирован.",
        'not_bound' => "Виджет с именем класса ':name' не связан с контроллером.",
    ],
    'page' => [
        'untitled' => "Без названия",
        'access_denied' => [
            'label' => "Доступ запрещен",
            'help' => "У вас нет необходимых прав для просмотра этой страницы.",
            'cms_link' => "Перейти к CMS",
        ],
    ],
    'partial' => [
        'not_found' => "Не удалось найти шаблон (partial) с именем :name.",
    ],
    'account' => [
        'sign_out' => 'Выйти',
        'login' => 'Вход',
        'reset' => 'Сбросить',
        'restore' => 'Восстановить',
        'login_placeholder' => 'пользователь',
        'password_placeholder' => 'пароль',
        'forgot_password' => "Забыли пароль?",
        'enter_email' => 'Введите вашу почту',
        'enter_login' => "Введите ваш Логин",
        'email_placeholder' => "почта",
        'enter_new_password' => 'Введите новый пароль',
        'password_reset' => "Сбросить пароль",
        'restore_success' => "На вашу электронную почту отправлено сообщение с инструкциями для восстановления пароля.",
        'restore_error' => "Пользователь с логином ':login' не найден.",
        'reset_success' => "Ваш пароль был успешно изменен. Теперь вы можете войти на сайт.",
        'reset_error' => "Недействительные данные для изменения пароля. Пожалуйста, попробуйте еще раз!",
        'reset_fail' => "Невозможно изменить пароль!",
        'apply' => 'Применить',
        'cancel' => 'Отменить',
        'delete' => 'Удалить',
        'ok' => 'OK',
    ],
    'dashboard' => [
        'menu_label' => 'Панель управления',
    ],
    'user' => [
        'name' => 'Администратора',
        'menu_label' => 'Администраторы',
        'list_title' => 'Управление администраторами',
        'new' => 'Добавить администратора',
        'login' => "Логин",
        'first_name' => "Имя",
        'last_name' => "Фамилия",
        'full_name' => "Полное имя",
        'email' => "Почта",
        'groups' => "Группы",
        'groups_comment' => "Укажите к какой группе принадлежит этот пользователь.",
        'avatar' => "Аватар",
        'password' => "Пароль",
        'password_confirmation' => "Подтверждение пароля",
        'superuser' => "Суперпользователь",
        'superuser_comment' => "Установите этот флажок, чтобы позволить пользователю получать доступ ко всем областям.",
        'send_invite' => 'Отправить приглашение по электронной почте',
        'send_invite_comment' => 'Используйте эту опцию, чтобы отправить приглашение пользователю по электронной почте',
        'delete_confirm' => 'Вы действительно хотите удалить этого администратора?',
        'return' => 'Вернуться к списку администраторов',
        'group' => [
            'name' => 'Группы',
            'name_field' => 'Название',
            'menu_label' => 'Группы',
            'list_title' => 'Управление группами',
            'new' => 'Добавить группу',
            'delete_confirm' => 'Вы действительно хотите удалить эту группу администраторов?',
            'return' => 'Вернуться к списку групп',
        ],
        'preferences' => [
            'not_authenticated' => 'Невозможно загрузить или сохранить настройки для неавторизованного пользователя.',
        ],
    ],
    'list' => [
        'default_title' => 'Список',
        'search_prompt' => 'Поиск...',
        'no_records' => 'По вашему запросу ничего не найдено.',
        'missing_model' => 'Для списка используемого в :class не определена модель.',
        'missing_column' => 'Нет никаких определений столбца для :columns.',
        'missing_columns' => 'Список используемый в :class не имеет никаких столбцов.',
        'missing_definition' => "Поведение списка не содержит столбец для ':field'.",
        'behavior_not_ready' => 'Поведение списка не было инициализировано, проверьте вызов makeLists() в вашем контроллере.',
        'invalid_column_datetime' => "Значение столбца ':column' не является объектом DateTime. Отсутствует \$dates ссылка в модели?",
    ],
    'form' => [
        'create_title' => "Создание :name",
        'update_title' => "Редактирование :name",
        'preview_title' => "Предпросмотр :name",
        'create_success' => ':name был успешно создан',
        'update_success' => ':name был успешно сохранен',
        'delete_success' => ':name был успешно удален',
        'missing_id' => "Идентификатор формы записи не указан.",
        'missing_model' => 'Для формы используемой в :class не определена модель.',
        'missing_definition' => "Поведение формы не содержит поле для':field'.",
        'not_found' => 'Форма записи с идентификатором :ID не найдена.',
        'create' => 'Создать',
        'create_and_close' => 'Создать и закрыть',
        'creating' => 'Создание...',
        'save' => 'Сохранить',
        'save_and_close' => 'Сохранить и закрыть',
        'saving' => 'Сохранение...',
        'delete' => 'Удалить',
        'deleting' => 'Удаление...',
        'undefined_tab' => 'Разное',
        'field_off' => 'Выкл',
        'field_on' => 'Вкл',
        'apply' => 'Применить',
        'cancel' => 'Отмена',
        'close' => 'Закрыть',
        'ok' => 'OK',
        'or' => 'или',
        'confirm_tab_close' => 'Закрыть вкладку? Несохраненные изменения будут потеряны.',
        'behavior_not_ready' => 'Поведение формы не было инициализировано, проверьте вызов initForm() в вашем контроллере.',
        'preview_no_files_message' => 'Файлы не загружены',
        'select' => 'Выбрать',
        'select_all' => 'все',
        'select_none' => 'ничего',
    ],
    'relation' => [
        'missing_definition' => "Поведение отношения не содержит определения для ':field'.",
        'missing_model' => "Для поведения отношения, используемого в :class не определена модель.",
        'invalid_action_single' => "Это действие не может быть выполнено для особого отношения.",
        'invalid_action_multi' => "Это действие не может быть выполнено для множественных отношений.",
        'add' => "Добавить",
        'add_name' => "Добавление :name",
        'create' => "Создать",
        'create_name' => "Создание :name",
        'update' => "Update",
        'update_name' => "Update :name",
        'remove' => "Удалить",
        'remove_name' => "Удаление :name",
        'delete' => "Удалить",
        'delete_name' => "Удаление :name",
    ],
    'model' => [
        'name' => "Модель",
        'not_found' => "Модель ':class' с идентификатором :id не найдена",
        'missing_id' => "Нет идентификатора для поиска модели записи.",
        'missing_relation' => "Модель ':class' не содержит определения для ':relation'",
        'invalid_class' => "Модель :model используемая в :class не допустима, она должна наследовать класс \Model.",
        'mass_assignment_failed' => "Массовое заполнение недоступно для атрибута модели ':attribute'.",
    ],
    'warnings' => [
        'tips' => 'Подсказки по конфигурации системы',
        'tips_description' => 'Есть проблемы, на которые стоит обратить внимание, чтобы правильно настроить систему.',
        'permissions'  => 'Каталог :name или его подкаталоги недоступны для записи. Укажите соответствующие разрешения для веб-сервера.',
        'extension' => 'Расширение PHP :name не установлено. Установите эту библиотеку и активируйте расширение.'
    ],
    'editor' => [
        'menu_label' => 'Настройки редактора',
        'menu_description' => 'Управление настройками редактора кода.',
        'font_size' => 'Размер шрифта',
        'tab_size' => 'Размер табуляции',
        'use_hard_tabs' => 'Использовать табуляцию для индентации',
        'code_folding' => 'Свертывание кода',
        'word_wrap' => 'Перенос слов',
        'highlight_active_line' => 'Подсвечивать активную строку',
        'show_invisibles' => 'Показывать невидимые символы',
        'show_gutter' => 'Показывать нумерацию строк',
        'theme' => 'Цветовая схема',
    ],
    'tooltips' => [
        'preview_website' => 'Просмотр сайта'
    ],
    'mysettings' => [
        'menu_label' => 'Мои настройки',
        'menu_description' => 'Управление настройками учетной записи администратора.',
    ],
    'myaccount' => [
        'menu_label' => 'Мой аккаунт',
        'menu_description' => 'Управление личной информацией (имя, почта, пароль)',
    ],
    'backend_preferences' => [
        'menu_label' => 'Настройки панели управления',
        'menu_description' => 'Управление языком и внешним видом панели управления.',
        'locale' => 'Язык',
        'locale_comment' => 'Выберите желаемый язык панели управления.',
    ],
];