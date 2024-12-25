import numpy as np
import torch

def read_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return file.read().strip()

def load_embeddings(file_path, device):
    data = np.load(file_path)
    case_ids = data["case_ids"]
    case_embeddings = torch.tensor(data["embeddings"]).to(device)
    return case_ids, case_embeddings
