package com.komsy.analyzer.dto;

public class ChatResponse {
    private String answer;

    public ChatResponse(String answer) {
        this.answer = answer;
    }

    public String getAnswer() {
        return answer;
    }
}
