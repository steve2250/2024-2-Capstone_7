import torch
import numpy as np

def encode_text(text, tokenizer, model, device, max_length=512):
    tokens = tokenizer.tokenize(text)
    token_ids = tokenizer.convert_tokens_to_ids(tokens)

    token_ids = token_ids[:max_length]
    input_tensor = torch.tensor([token_ids]).to(device)

    with torch.no_grad():
        outputs = model(input_tensor)
        embedding = outputs.last_hidden_state.mean(dim=1)

    return embedding

def calculate_similarity(query_embedding, case_embeddings):
    return torch.nn.functional.cosine_similarity(query_embedding, case_embeddings)
