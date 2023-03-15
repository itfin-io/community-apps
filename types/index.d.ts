/**
 * Типи звільнення
 */
enum ResignType {
    Voluntary = 'voluntary',
    Involuntary = 'involuntary',
}

/**
 * Типи працівників
 */
enum UserEnum {
    Employee = 'employee',
    Contractor = 'contractor',
    Freelancer = 'freelancer',
    FromPartners = 'from-partners',
    OneTimeWorker = 'one-time-worker',
    GigWorker = 'gig-worker',
}

/**
 * Стать
 */
enum GenderEnum {
    Male = 'Male',
    Female = 'Female',
    Other = 'Other'
}

/**
 * Статус працівника
 */
enum StatusEnum {
    Active = 'Active',
    Inactive = 'Inactive'
}

/**
 * Об'єкт, що описує працівника
 */
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

/**
 * Типи відгулів
 */
enum TimeoffType {
    Vacation = 'Vacation',
    Sickness = 'Sickness',
    UnpaidLeave = 'UnpaidLeave',
    PaidLeave = 'PaidLeave'
}

/**
 * Об'єкт, що описує відгул
 */
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

enum TimesheetType {
    Work = 'Work',
    Overtime = 'Overtime'
}

/**
 * Об'єкт, що описує звітування часу
 */
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
    Type: TimesheetType, // тип запису (Work, Overtime)
    
    CreatedBy: number, // id користувача, який створив запис
    CreatedAt: string, // дата створення запису (ISO, yyyy-MM-ddTHH:mm:ss.SSSZ)
    UpdatedAt?: string, // дата останнього оновлення запису (ISO, yyyy-MM-ddTHH:mm:ss.SSSZ)
    DeletedAt?: string // дата видалення запису (ISO, yyyy-MM-ddTHH:mm:ss.SSSZ)
}

/**
 * Об'єкт, що описує учасника події
 */
interface EventAttendee {
    Id: number, // bigint
    FirstName: string,
    LastName: string,
    Email: string,
}

enum EventTypes {
    PerformanceAppraisal = 'PerformanceAppraisal',
    OneOnOne = 'OneOnOne',
}

/**
 * Об'єкт, що описує подію
 */
interface Event {
    Id: number, // ITFin id
    CalendarId: number, // internal calendar id
    Name: string, // Назва події
    Description?: string, // Опис події
    DateFrom: string, // Дата початку події (ISO, yyyy-MM-ddTHH:mm:ss.SSSZ)
    DateTo: string, // Дата закінчення події (ISO, yyyy-MM-ddTHH:mm:ss.SSSZ)
    CreatedAt: string, // Дата створення події (ISO, yyyy-MM-ddTHH:mm:ss.SSSZ)
    UpdatedAt: string, // Дата останнього оновлення події (ISO, yyyy-MM-ddTHH:mm:ss.SSSZ)
    Recurrence?: string, // Повторення події, у форматі RRULE
    RefEntity: EventTypes, // тип події
    RefId: number, // id пов'язаної сутності
    Attendees: Array<EventAttendee> // учасники події
}

/**
 * Клас для виконання запитів назовні
 */
class ITFinRequest {
    static get(url: string, data?: object | null, options?: object | null): Promise<{ data: any, status: number, statusText: string, headers: object }>;

    static put(url: string, data?: object | null, options?: object | null): Promise<{ data: any, status: number, statusText: string, headers: object }>;

    static post(url: string, data?: object | null, options?: object | null): Promise<{ data: any, status: number, statusText: string, headers: object }>;

    static delete(url: string, data?: object | null, options?: object | null): Promise<{ data: any, status: number, statusText: string, headers: object }>;

    static patch(url: string, data?: object | null, options?: object | null): Promise<{ data: any, status: number, statusText: string, headers: object }>;
}

interface ITFinAppConfig {
}

type ITFinAppConfigReturn = <T>() => T;

class ITFinAppInstance<Type> {
    getCompanyId(): number;

    getAppConfig(): ITFinAppConfigReturn;
}

class ITFinApp<Type> {
    static createCommunityApp(): ITFinAppInstance<ITFinAppConfigReturn>;
}

class ITFinPropertyBag {
    static get(name:string): Promise<string>;
    static set(name:string, value:string): void;
    static remove(name:string): void;
}
