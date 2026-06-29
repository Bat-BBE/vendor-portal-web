export interface UserAvatarProps {
  name?: string;
  src?: string;
  size?: number;
  className?: string;
}
export interface HeaderProps {
  title?: string;
  subtitle?: string;
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
  notificationCount?: number;
  onNotificationClick?: () => void;
  onUserClick?: () => void;
  logo?: React.ReactNode;
  className?: string;
}
