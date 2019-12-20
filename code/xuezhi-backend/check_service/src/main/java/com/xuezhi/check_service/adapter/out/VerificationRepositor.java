package com.xuezhi.check_service.adapter.out;

import com.xuezhi.check_service.domain.entity.Verification;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface VerificationRepositor extends MongoRepository<Verification, String> {
    void deleteVerificationById(String id);
}
