type UserInfo = {
  id: number;
  name: string;
  email: string;
  birthday: string;
  realname: string;
  cellphone: string;
  avatar_url: string;
};

type RepliesType = {
  id: number;
  content: string;
  createAt: string;
  updateAt: string;
  userInfo: UserInfo;
  articleId: number;
  commentId: number;
  replyInfo: null;
  replyUserInfo: null;
  rootCommentId: number;
};

type Replies = { list1: RepliesType[] };

type List = {
  id: number;
  userId: number;
  content: string;
  articleId: number;
  commentId: null;
  replyUserId: null;
  rootCommentId: null;
  userInfo: UserInfo;
  createAt: string;
  updateAt: string;
  replies: Replies;
};

interface resData {
  list: List[];
}
