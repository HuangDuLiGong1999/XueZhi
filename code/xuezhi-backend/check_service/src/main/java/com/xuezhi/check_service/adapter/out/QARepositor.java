package com.xuezhi.check_service.adapter.out;

import com.xuezhi.check_service.domain.entity.Question;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface QARepositor extends MongoRepository<Question, String> {

    Question findQuestionByQuestionId(String questionId);

    List<Question> findQuestionByAskerId(String askerId);

    void deleteQuestionByQuestionId(String questionId);
}
