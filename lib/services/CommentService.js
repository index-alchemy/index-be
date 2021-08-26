import Comment from '../models/Comment.js';

export default class CommentService {
  static create = async comment => 
    await Comment.create(comment)
  ;

  static getCommentsForPitch = async pitchId => 
    await Comment.findBy(pitchId, 'pitch_id', false)
  ;

  static getCommentsForUser = async userId =>
    await Comment.findBy(userId, 'user_id', false)
  ;

  static update = async (id, comment) => 
    await Comment.updateCommentBy(comment, id)
  ;

  static delete = async id => 
    await Comment.deleteBy(id)
  ;
};
