package com.komsy.analyzer.controller;
import com.komsy.analyzer.dto.ChatRequest;
import com.komsy.analyzer.dto.ChatResponse;
import com.komsy.analyzer.service.ChatService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private static final int MAX_MESSAGE_LENGTH = 1000;

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping
    public ResponseEntity<ChatResponse> chat(@RequestBody ChatRequest request) {
        String message = request.getMessage();
        if (message != null && message.length() > MAX_MESSAGE_LENGTH) {
            return ResponseEntity.badRequest()
                .body(new ChatResponse("Message trop long (" + MAX_MESSAGE_LENGTH + " caractères maximum)."));
        }
        String answer = chatService.answer(message, request.getLang());
        return ResponseEntity.ok(new ChatResponse(answer));
    }
}

