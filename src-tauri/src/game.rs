#[derive(Clone, serde::Serialize)]
pub struct Call {
    warning: String,
    taunter: String,
}

#[derive(Clone, serde::Serialize)]
pub struct Block {
    zone_holder: String,
    calls: Vec<Call>,
}

pub struct Game {
    blocks: Vec<Block>,
    current_block: usize,
}

impl Game {
    fn new(blocks: Vec<Block>) -> Self {
        Self {
            blocks,
            current_block: 0,
        }
    }

    pub fn next_block(&mut self) -> &Block {
        let block = &self.blocks[self.current_block];
        self.current_block = (self.current_block + 1) % self.blocks.len();
        if self.current_block == 0 {
            self.current_block = 1;
        }

        return block;
    }
}

pub fn create_game() -> Game {
    let blocks = vec![
        Block {
            zone_holder: "SC".to_string(),
            calls: vec![
                Call {
                    warning: "Truth".to_string(),
                    taunter: "LR".to_string(),
                },
                Call {
                    warning: "Listen".to_string(),
                    taunter: "LOO".to_string(),
                },
            ],
        },
        Block {
            zone_holder: "LR".to_string(),
            calls: vec![
                Call {
                    warning: "Truth".to_string(),
                    taunter: "AP".to_string(),
                },
                Call {
                    warning: "Listen".to_string(),
                    taunter: "SC".to_string(),
                },
                Call {
                    warning: "Truth".to_string(),
                    taunter: "SC".to_string(),
                },
            ],
        },
        Block {
            zone_holder: "AP".to_string(),
            calls: vec![
                Call {
                    warning: "Listen".to_string(),
                    taunter: "LR".to_string(),
                },
                Call {
                    warning: "Truth".to_string(),
                    taunter: "LR".to_string(),
                },
                Call {
                    warning: "Truth".to_string(),
                    taunter: "LOO".to_string(),
                },
                Call {
                    warning: "Listen".to_string(),
                    taunter: "LOO".to_string(),
                },
            ],
        },
        Block {
            zone_holder: "LOO".to_string(),
            calls: vec![
                Call {
                    warning: "Truth".to_string(),
                    taunter: "AP".to_string(),
                },
                Call {
                    warning: "Listen".to_string(),
                    taunter: "SC".to_string(),
                },
                Call {
                    warning: "Truth".to_string(),
                    taunter: "SC".to_string(),
                },
            ],
        },
        Block {
            zone_holder: "SC".to_string(),
            calls: vec![
                Call {
                    warning: "Listen".to_string(),
                    taunter: "LR".to_string(),
                },
                Call {
                    warning: "Truth".to_string(),
                    taunter: "LR".to_string(),
                },
                Call {
                    warning: "Truth".to_string(),
                    taunter: "LOO".to_string(),
                },
                Call {
                    warning: "Listen".to_string(),
                    taunter: "LOO".to_string(),
                },
            ],
        },
    ];

    Game::new(blocks)
}
