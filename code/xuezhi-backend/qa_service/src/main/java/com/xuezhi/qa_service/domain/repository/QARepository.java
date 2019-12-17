package com.xuezhi.qa_service.domain.repository;

import com.xuezhi.qa_service.domain.entity.Answer;
import com.xuezhi.qa_service.domain.entity.Question;

import java.util.List;

public interface QARepository {

    Question getQuestionByQuestionId(String questionId);

    List<Question> getQuestionByAskerId(String askerId);

    List<Question> getQuestionByRegex(String regex);

    List<Question> getQuestionsBySchool(String school);

    //List<Answer> getAnswerListByQuestionId(String questionId);

    void addQuestion(String title, String description, String askerId, String school);

    void updateQuestion(String questionId, String title, String description);

    void deleteQuestion(String questionId);

    void addAnswer(String questionId, String authorId, String description);

    void updateAnswer(String questionId, String authorId, String description);

    void deleteAnswer(String questionId, String authorId);

    void updateLikes(String questionId, String authorId, String likeUserId);
    //添加评论
    void addComment(String questionId, String authorId, String commentatorId, String description);
}
