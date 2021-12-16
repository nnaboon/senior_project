export enum HelpMenu {
  PROVIDE = 'provide',
  REQUEST = 'request'
}

export enum ProfileMenu {
  HOME = 'home',
  PROVIDE = 'provide',
  REQUEST = 'request'
}

export const HELP_MENU_MAPPER = {
  [HelpMenu.PROVIDE]: 'ให้ความช่วยเหลือ',
  [HelpMenu.REQUEST]: 'ขอความช่วยเหลือ'
};

export const PROFILE_MENU_MAPPER = {
  [HelpMenu.PROVIDE]: 'รายการให้ความช่วยเหลือของฉัน',
  [HelpMenu.REQUEST]: 'รายการขอความช่วยเหลือของฉัน'
};

export const PROFILE_MOBILE_MENU_MAPPER = {
  [ProfileMenu.HOME]: 'หน้าแรก',
  [ProfileMenu.PROVIDE]: 'รายการให้ความช่วยเหลือของฉัน',
  [ProfileMenu.REQUEST]: 'รายการขอความช่วยเหลือของฉัน'
};

export enum CommunityMenu {
  PROVIDE = 'provide',
  REQUEST = 'request',
  MEMBER = 'member'
}

export enum CommunitySettingMenu {
  MANAGE = 'manage',
  EDIT = 'edit'
}

export enum InfoMenu {
  INFO = 'info',
  LIST = 'list'
}

export const COMMUNITY_MENU_MAPPER = {
  [CommunityMenu.PROVIDE]: 'รายการให้ความช่วยเหลือ',
  [CommunityMenu.REQUEST]: 'รายการขอความช่วยเหลือ',
  [CommunityMenu.MEMBER]: 'สมาชิก'
};

export const COMMUNITY_SETTING_MENU_MAPPER = {
  [CommunitySettingMenu.MANAGE]: 'จัดการสมาชิกในชุมชน',
  [CommunitySettingMenu.EDIT]: 'แก้ไขข้อมูลชุมชน'
};

export const INFO_MENU_MAPPER = {
  [InfoMenu.INFO]: 'ข้อมูลความช่วยเหลือ',
  [InfoMenu.LIST]: 'ผู้ต้องการช่วยเหลือ'
};
