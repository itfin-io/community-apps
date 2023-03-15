# ITFin Events

## Події

| Подія              | Тип обʼєкту | Опис                                                                                              |
|--------------------|-------------|---------------------------------------------------------------------------------------------------|
| **Працівники**     |             |                                                                                                   |
| employees:created  | Employee    | Створення працівника                                                                              |
| employees:updated  | Employee    | Оновлення інформації по працівнику                                                                |
| employees:disabled | Employee    | Переведення працівника в неактивний статус                                                        |
| **Звітування**     |             |                                                                                                   |
| timeoffs:created   | Timeoff     | Звітування відпустки/лікарняного/і т.д. Якщо є процес узгодження, то після того як буде узгоджена |
| timeoffs:deleted   | Timeoff     | Видалення звітування                                                                              |
| timesheets:created | Timesheet   | Звітування часу працівником. Не включає час підтягнутий з інтеграцій (Jira, Redmine, ...)         |
| timesheets:updated | Timesheet   | Редагування звітування                                                                            |
| timesheets:deleted | Timesheet   | Видалення звітування                                                                              |
| **Узгодження**     |             |                                                                                                   |
| requests:created   | Request     | Звітування відпустки/лікарняного/і т.д. Якщо є процес узгодження, то після того як буде узгоджена |
| requests:approved  | Request     | Запит погоджено усіма апруверами                                                                  |
| requests:rejected  | Request     | Запит відхилено                                                                                   |
| requests:canceled  | Request     | Запит видалено ініціатором                                                                        |
| **Події**          |             |                                                                                                   |
| events:created     | Event       | Створено подію (Appraisal, One2One)                                                               |
| events:updated     | Event       | Оновлено подію                                                                                    |
| events:deleted     | Event       | Видалено подію                                                                                    |

## Обʼєкти

### Employee

```ts
enum ResignType {
  Voluntary = 'voluntary',
  Involuntary = 'involuntary',
};

enum UserEnum {
    Employee = 'employee',
    Contractor = 'contractor',
    Freelancer = 'freelancer',
    FromPartners = 'from-partners',
    OneTimeWorker = 'one-time-worker',
    GigWorker = 'gig-worker',
};

enum GenderEnum {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other'
};

enum StatusEnum {
  Active = 'Active',
  Inactive = 'Inactive'
};

interface Employee {
  Id: number, // ITFin id
  CandidateId?: number, // Id кандидата в системі кандидатів
  CandidateUrl?: number, // Url кандидата в зовнішньому сервісі
  PersonProfileId: number, // Id профілю працівника (експертиза)
  ExternalId?: string, // Id працівника в зовнішньому сервісі
  UserType: UserEnum, // Тип працівника
  FirstName: string, // Імʼя (зазвичай англійською)
  LastName: string, // Прізвище (зазвичай англійською)
  NativeName?: string, // Імʼя рідною мовою
  Email: string, // Email
  PersonalEmail?: string, // Особистий email
  Status: StatusEnum, // Статус працівника
  Telegram?: string, // Telegram
  Skype?: string, // Skype
  Phone?: string, // Телефон
  DateOfEmployment: string, // Дата прийняття на роботу (ISO, yyyy-MM-dd)
  
  DateOfResign: string, // Дата звільнення (ISO, yyyy-MM-dd)
  ResignType: ResignType, // Тип звільнення
  ResignCategory?: string, // Категорія звільнення
  ResignReason?: string, // Причина звільнення

  DateOfTrialPeriod?: string, // Дата закінчення пробного періоду (ISO, yyyy-MM-dd)
  DateOfBirth?: string, // Дата народження (ISO, yyyy-MM-dd)

  OfficeId?: number, // Id офісу
  PositionId?: number, // Id посади
  LineManagerId?: number, // Id лінійного менеджера
  HrManagerId?: number, // Id HR менеджера
  AccountantId?: number, // Id бухгалтера
  ResourceManagerId?: number, // Id менеджера ресурсів
  MentorId?: number, // Id ментора
  Country: string, // країна робочого календаря
  LocationCountry: string, // країна місцезнаходження
  Gender: GenderEnum, // стать
  ResidenceAddress?: string, // адреса проживання
  EmergencyContacts?: string, // контакти в разі надзвичайної ситуації
  PostalAddress?: string, // поштова адреса
  Notes?: string, // примітки
  PartnerName?: string, // назва компанії-партнера, якщо це тип UserType = 'from-partners'
  IsWelcomeLetter?: boolean, // чи відправлено листа з привітанням
  IsPrivateEntrepreneur?: boolean, // чи є підприємцем
}
```

### Timeoff

```ts
enum TimeoffType {
    Vacation = 'Vacation',
    Sickness = 'Sickness',
    UnpaidLeave = 'UnpaidLeave',
    PaidLeave = 'PaidLeave'
};

interface Timeoff {
    Id: number, // ITFin id
    Date: string, // дата (ISO, yyyy-MM-dd)
    MinutesInt: number, // кількість зазвітованих хвилин
    EmployeeId: number, // id працівника
    Comment?: string, // коментар
    Type: TimeoffType, // тип відгулу (Vacation, Sickness, UnpaidLeave, PaidLeave)
    Reason: string, // причина відсутності
    RequestId?: number, // id заявки
    CreatedBy?: number, // id користувача, який створив запис

    CreatedAt: string, // дата створення запису (ISO, yyyy-MM-ddTHH:mm:ss.SSSZ)
    UpdatedAt?: string, // дата останнього оновлення запису (ISO, yyyy-MM-ddTHH:mm:ss.SSSZ)
    DeletedAt?: string // дата видалення запису (ISO, yyyy-MM-ddTHH:mm:ss.SSSZ)
}
```

### Timesheet

```ts
interface Timesheet {
    Id: number, // ITFin id
    Date: string, // дата (ISO, yyyy-MM-dd)
    MinutesInt: number, // кількість зазвітованих хвилин
    MinutesExt: number, // кількість billable-хвилин
    EmployeeId: number, // id працівника
    ReviewedBy: number, // id користувача, який затвердив чи відхилив запис
    Approved: boolean, // true - Approved, false - Declined
    DeclineReason: string, // причина відхилення
    TaskId: number, // id завдання
    InvoiceId: number, // id рахунку
    ClientAgreementId: number, // id домовленості в проєкті
    Comment: string, // коментар
    ExternalId: string, // id запису в іншій системі
    ExternalTool: string, // інструмент, з якого було завантажено дані
    TaskReference: string, // довільний текст, дев може вписати якусь додаткову інфу по таску, якщо це включено для проекту
    IntegrationId: number, // id інтеграції
    Type: string, // тип запису (Work, Overtime)
    Reason: string, // причина відсутності
    RequestId: number, // id заявки
    CreatedBy: number, // id користувача, який створив запис

    CreatedAt: string, // дата створення запису (ISO, yyyy-MM-ddTHH:mm:ss.SSSZ)
    UpdatedAt?: string, // дата останнього оновлення запису (ISO, yyyy-MM-ddTHH:mm:ss.SSSZ)
    DeletedAt?: string // дата видалення запису (ISO, yyyy-MM-ddTHH:mm:ss.SSSZ)
}
```
