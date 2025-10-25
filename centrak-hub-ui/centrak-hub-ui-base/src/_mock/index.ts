// Mock data for contacts
export const _contacts = [
  {
    id: '1',
    name: 'John Doe',
    avatar: '/static/mock-images/avatars/avatar_1.jpg',
    lastActivity: new Date(),
    status: 'online',
  },
  {
    id: '2',
    name: 'Jane Smith',
    avatar: '/static/mock-images/avatars/avatar_2.jpg',
    lastActivity: new Date(),
    status: 'busy',
  },
];

// Mock data for notifications
export const _notifications = [
  {
    id: '1',
    title: 'Your order is placed',
    description: 'waiting for shipping',
    avatar: null,
    type: 'order_placed',
    createdAt: new Date(),
    isUnRead: true,
  },
  {
    id: '2',
    title: 'John Doe',
    description: 'answered to your comment on the Minimal',
    avatar: '/static/mock-images/avatars/avatar_1.jpg',
    type: 'friend_interactive',
    createdAt: new Date(),
    isUnRead: true,
  },
  {
    id: '3',
    title: 'You have new message',
    description: '5 unread messages',
    avatar: null,
    type: 'chat_message',
    createdAt: new Date(),
    isUnRead: false,
  },
];

