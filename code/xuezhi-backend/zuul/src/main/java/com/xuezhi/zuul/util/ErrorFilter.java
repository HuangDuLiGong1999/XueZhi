package com.xuezhi.zuul.util;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;

@Component
public class ErrorFilter extends ZuulFilter {
    private Logger logger = LoggerFactory.getLogger(ErrorFilter.class);

    /**
     * 过滤方法
     */
    @Override
    public Object run() {
        // 获取Request上下文
        RequestContext rc = RequestContext.getCurrentContext();
        HttpServletRequest request = rc.getRequest();
        logger.info("LogFilter .... 请求的路径是{},请求提交的方式是{}", request.getRequestURL().toString(),request.getMethod());
        return null;
    }

    /**
     * 是否开启过滤:默认false
     */
    @Override
    public boolean shouldFilter()
    {
        return false;
    }

    /**
     * 多个过滤器中的执行顺序，数值越小，优先级越高
     */
    @Override
    public int filterOrder()
    {
        return 0;
    }

    /**
     * 过滤器的类型
     */
    @Override
    public String filterType()
    {
        return "error";
    }

}
