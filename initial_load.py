import json
boys = {
    "Connor":
    [
        "Good in bed?",
        "Smart? Engineer",
        "Pretty sweet apartment",
        "Puts effort into appearance",
        "goes for it (ice skating)",
        "irresponsible with pets",
        "constantly on \"brink of death\" - won't climb",
        "too much PDA",
        "leaves early and takes Zoe with him",
        "doesn't make it (ice skating)",
        "high 100%% of the time"
    ],
        "Nicholas":
            [
                "8 pack",
                "alpine valley",
                "gives tea (generous boy)",
                "responsible",
                "anchorman & engineer",
                "designated driver",
                "sex is great - Mikey",
                "gives concussions",
                "misses dirty jokes (coming around)",
                "friends with Quy",
                "mysterious (won't go by Nick)"
    ],
        "Ryan":
            [
                "dresses well",
                "doctorate",
                "has good friends",
                "willing to \"try new things\" ;)",
                "makes Andie do Rumpleminze shots with him",
                "threesome??",
                "has a lot of gusto, not much follow-through",
                "works a lot",
                "macks at bars",
                "in love with Mitchel and Jackson, but acts upon it"
    ],
        "Jackson":
            [
                "always down",
                "can drive (and teach) stick",
                "not afraid to be silly",
                "smart but is stupid abt it"
                "loyal as all heck",
                "shit is all over the place, but trying",
                "messy",
                "in love with Mitchel",
                "doubts himself",
                "still has homework :(",
                "is 21"
    ]
}

boys_map = {}
for boy in boys:
    boys_map[boy] = list(map(lambda attrib: (attrib, 0), boys[boy]))


with open('./boys_map.json', 'r+') as f:
    f.truncate(0)
    json.dump(boys_map, f)
