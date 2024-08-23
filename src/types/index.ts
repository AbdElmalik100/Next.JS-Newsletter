type CommonFields = {
    id?: string,
    created_at?: string
}

export const CampaignStatusArray = ['Draft', 'Sent', 'Archived']
export const EmailsStatusArray = ['Draft','Completed']
export const SubscriberStatusArray = ['Active','Inactive', 'Completed']

type CampaignStatus = typeof CampaignStatusArray[number]
type EmailsStatus = typeof EmailsStatusArray[number]
type SubscriberStatus = typeof SubscriberStatusArray[number]


export type Campaign = {
    name: string,
    from: string | undefined,
    subject: string | undefined,
    list_id: string | undefined,
    status: CampaignStatus | undefined,
    user_id: string | undefined,
    email_id: string | undefined,
} & CommonFields

export type Emails = {
    title: string,
    content: string,
    status: EmailsStatus,
} & CommonFields

export type Subscriber = {
    email: string,
    owner_id: string,
    status: SubscriberStatus,
} & CommonFields

export type User = {
    dark_mode: boolean,
    email: string,
} & CommonFields

export type UserForm = {
    email: string,
    password: string
}

export type MenuLinks = {
    groupName: string,
    list: List[]
}

export type List = {
    icon: string,
    path: string,
    title: string,
}