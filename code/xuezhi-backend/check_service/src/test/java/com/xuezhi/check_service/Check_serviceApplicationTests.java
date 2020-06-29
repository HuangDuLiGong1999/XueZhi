package com.xuezhi.check_service;

import com.xuezhi.check_service.adapter.out.AdministratorRepositor;
import com.xuezhi.check_service.adapter.out.AdministratorRepositoryImpl;
import com.xuezhi.check_service.adapter.out.ReportRepositoryImpl;
import com.xuezhi.check_service.domain.entity.Administrator;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@ExtendWith(SpringExtension.class)
class Check_serviceApplicationTests {

    @Autowired
    private final ReportRepositoryImpl report = new ReportRepositoryImpl();
    @Autowired
    private final AdministratorRepositoryImpl admin = new AdministratorRepositoryImpl();

    @Test
    void addReportTest() {
        //空值测试
        assertEquals(false,report.addReport("","5ef99259e7c16d4b111c8f11","2"));
        assertEquals(false,report.addReport("question","","2"));
        assertEquals(false,report.addReport("question","5ef99259e7c16d4b111c8f11",""));

        //参数错误
        assertEquals(false,report.addReport("000000","5ef99259e7c16d4b111c8f11","2"));
        assertEquals(false,report.addReport("question","******","2"));
        assertEquals(false,report.addReport("question","5ef99259e7c16d4b111c8f11","CCCCCC"));

        //合法情况
        assertEquals(true,report.addReport("question","5ef99259e7c16d4b111c8f11","2"));
    }

    @Test
    void deleteReportTest() {
        //空值测试
        assertEquals(false,report.deleteReport(""));

        //参数错误
        assertEquals(false,report.deleteReport("abc"));

        //合法情况
        assertEquals(false,report.deleteReport("5ef997d665abd877a511182c"));
    }

    @Test
    void getAdministratorTest() {
        Administrator adm = new Administrator();
        adm.setName("1234567@qq.com");
        adm.setPassword("1234567");
        adm.setUniversity("root");

        //空值测试
        assertEquals(null,admin.getAdministrator("","123"));
        assertEquals(null,admin.getAdministrator("123",""));

        //参数错误
        assertEquals(null,admin.getAdministrator("123","1234567"));
        assertEquals(null,admin.getAdministrator("1234567@qq.com","123"));

        //合法情况
        assertEquals(true,adm.equals(admin.getAdministrator("1234567@qq.com","1234567")));
    }

}
