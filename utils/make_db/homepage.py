from collections import defaultdict
from logging import getLogger

logger = getLogger(__name__)


def medals_key(medals):
    return (medals["gold"], medals["silver"], medals["bronze"])


def default(value, default):
    if value is None:
        return default
    return value


def get_region_with_most_medals(storage, result):
    regions = [r for r in storage.regions]
    regions.sort(reverse=True, key=lambda r: medals_key(r.num_medals))

    def output(region):
        return {
            "id": region.id,
            "name": region.name,
            "num_medals": region.num_medals,
        }

    result.append(
        {
            "region_with_most_medals": {
                "first": output(regions[0]),
                "second": output(regions[1]),
            },
        }
    )


def get_region_with_most_medals_per_participant(storage, result):
    regions = [r for r in storage.regions]
    key = lambda r: sum(medals_key(r.num_medals)) / r.num_contestants
    best = max(regions, key=key)

    result.append(
        {
            "region_with_most_medals_per_participant": {
                "id": best.id,
                "name": best.name,
                "medals_per_participants": key(best),
            },
        }
    )


def get_region_with_most_first_places(storage, result):
    regions = [r for r in storage.regions]
    key = lambda r: r.num_first_places
    best = max(regions, key=key)

    result.append(
        {
            "region_with_most_first_places": {
                "id": best.id,
                "name": best.name,
                "num_first_places": key(best),
            },
        }
    )


def get_region_with_most_participants(storage, result):
    regions = [r for r in storage.regions]
    key = lambda r: r.num_contestants
    best = max(regions, key=key)

    result.append(
        {
            "region_with_most_participants": {
                "id": best.id,
                "name": best.name,
                "num_participants": key(best),
            },
        }
    )


def region(storage):
    result = []
    get_region_with_most_medals(storage, result)
    get_region_with_most_medals_per_participant(storage, result)
    get_region_with_most_first_places(storage, result)
    get_region_with_most_participants(storage, result)
    return result


###############################################################################


def get_best_student(storage, result):
    users = [u for u in storage.users]
    key = lambda u: medals_key(u.num_medals)
    users.sort(key=key, reverse=True)

    # ex-aequo of medals
    if key(users[0]) == key(users[1]):
        logger.debug("No best_student due to ex-aequo of medals")
        return

    result.append(
        {
            "best_student": {
                "contestant": users[0].contestant,
                "num_medals": users[0].num_medals,
            },
        }
    )


def get_win_at_first_participation(storage, result):
    users = [u for u in storage.users if u.win_at_first_participation]
    for u in users:
        result.append(
            {
                "win_at_first_participation": {
                    "contestant": u.contestant,
                    "year": min(p.contest.year for p in u.participations),
                },
            }
        )


def get_student_with_most_participations(storage, result):
    users = [u for u in storage.users]
    key = lambda u: len(u.participations)
    users.sort(key=key, reverse=True)

    # ex-aequo
    if key(users[0]) == key(users[1]):
        logger.debug("No student_with_most_participations due to ex-aequo")
        return

    result.append(
        {
            "student_with_most_participations": {
                "contestant": users[0].contestant,
                "num_participations": key(user[0]),
            },
        }
    )


def get_ioist_with_worst_rank(storage, result):
    participations = [p for u in storage.users for p in u.participations if p.IOI]
    key = lambda p: p.rank
    participations.sort(key=key, reverse=True)

    # ex-aequo
    if key(participations[0]) == key(participations[1]):
        logger.debug("No ioist_with_worst_rank due to ex-aequo")
        return

    result.append(
        {
            "ioist_with_worst_rank": {
                "contestant": participations[0].user.contestant,
                "contest_year": participations[0].contest.year,
                "rank": participations[0].rank,
            },
        }
    )


def user(storage):
    result = []
    get_best_student(storage, result)
    get_win_at_first_participation(storage, result)
    get_student_with_most_participations(storage, result)
    get_ioist_with_worst_rank(storage, result)
    return result


###############################################################################


def get_task_with_lowest_avg_score(storage, result):
    tasks = [t for y in storage.tasks.values() for t in y.values()]
    best = min(
        tasks,
        key=lambda t: default(t.avg_score, 10000) / default(t.max_score_possible, 1),
    )

    result.append(
        {
            "task_with_lowest_avg_score": {
                "contest_year": best.contest.year,
                "name": best.name,
                "title": best.title,
                "avg_score": best.avg_score,
                "max_score_possible": best.max_score_possible,
            }
        }
    )


def get_task_with_highest_avg_score(storage, result):
    tasks = [t for y in storage.tasks.values() for t in y.values()]
    best = max(
        tasks,
        key=lambda t: default(t.avg_score, 0) / default(t.max_score_possible, 10000),
    )

    result.append(
        {
            "task_with_highest_avg_score": {
                "contest_year": best.contest.year,
                "name": best.name,
                "title": best.title,
                "avg_score": best.avg_score,
                "max_score_possible": best.max_score_possible,
            }
        }
    )


def get_task_with_lowest_max_score(storage, result):
    tasks = [t for y in storage.tasks.values() for t in y.values()]
    best = min(
        tasks,
        key=lambda t: default(t.max_score, 10000) / default(t.max_score_possible, 1),
    )

    result.append(
        {
            "task_with_lowest_max_score": {
                "contest_year": best.contest.year,
                "name": best.name,
                "title": best.title,
                "max_score": best.max_score,
                "max_score_possible": best.max_score_possible,
            }
        }
    )


def get_task_with_most_zeros(storage, result):
    tasks = [t for y in storage.tasks.values() for t in y.values()]
    best = max(tasks, key=lambda t: default(t.num_zeros, 0) / len(t.scores))

    result.append(
        {
            "task_with_most_zeros": {
                "contest_year": best.contest.year,
                "name": best.name,
                "title": best.title,
                "num_zeros": best.num_zeros,
                "num_participants": len(best.scores),
            }
        }
    )


def get_task_with_most_fullscores(storage, result):
    tasks = [t for y in storage.tasks.values() for t in y.values()]
    best = max(tasks, key=lambda t: default(t.num_full_scores, 0) / len(t.scores))

    result.append(
        {
            "task_with_fullscores": {
                "contest_year": best.contest.year,
                "name": best.name,
                "title": best.title,
                "num_fullscores": best.num_full_scores,
                "num_participants": len(best.scores),
            }
        }
    )


def task(storage):
    result = []
    get_task_with_lowest_avg_score(storage, result)
    get_task_with_highest_avg_score(storage, result)
    get_task_with_lowest_max_score(storage, result)
    get_task_with_most_zeros(storage, result)
    get_task_with_most_fullscores(storage, result)
    return result


###############################################################################


def get_contest_with_most_participants(storage, result):
    contests = [c for c in storage.contests.values()]
    key = lambda c: len(c.participations)
    contests.sort(key=key, reverse=True)

    if key(contests[0]) == key(contests[1]):
        logger.debug("No contest_with_most_participants due to ex-aequo")
        return

    result.append(
        {
            "contest_with_most_participants": {
                "year": contests[0].year,
                "num_participants": key(contests[0]),
            }
        }
    )


def get_contest_with_most_ex_aequo(storage, result):
    contests = [c for c in storage.contests.values()]
    key = lambda c: default(c.num_ex_aequo, 0)
    contests.sort(key=key, reverse=True)

    if key(contests[0]) == key(contests[1]):
        logger.debug("No contest_with_most_ex_aequo due to ex-aequo")
        return

    result.append(
        {
            "contest_with_most_ex_aequo": {
                "year": contests[0].year,
                "num_ex_aequo": key(contests[0]),
            }
        }
    )


def get_most_northern_contest(storage, result):
    contests = [c for c in storage.contests.values()]
    key = lambda c: default(c.latitude, -10000)
    contests.sort(key=key, reverse=True)

    if key(contests[0]) == key(contests[1]):
        logger.debug("No most_northern_contest due to ex-aequo")
        return

    result.append(
        {
            "most_northern_contest": {
                "year": contests[0].year,
                "location": contests[0].location_info,
            }
        }
    )


def get_most_southern_contest(storage, result):
    contests = [c for c in storage.contests.values()]
    key = lambda c: default(c.latitude, 10000)
    contests.sort(key=key)

    if key(contests[0]) == key(contests[1]):
        logger.debug("No most_southern_contest due to ex-aequo")
        return

    result.append(
        {
            "most_southern_contest": {
                "year": contests[0].year,
                "location": contests[0].location_info,
            }
        }
    )


def get_contest_with_most_girls(storage, result):
    contests = [c for c in storage.contests.values()]
    key = lambda c: c.num_girls / len(c.participations)
    contests.sort(key=key, reverse=True)

    if key(contests[0]) == key(contests[1]):
        logger.debug("No contest_with_most_girls due to ex-aequo")
        return

    result.append(
        {
            "contest_with_most_girls": {
                "year": contests[0].year,
                "num_girls": contests[0].num_girls,
                "num_participants": len(contests[0].participations),
            }
        }
    )


def get_num_boys_girls(storage, result):
    years = [
        {"year": c.year, "num_boys": c.num_boys, "num_girls": c.num_girls}
        for c in storage.contests.values()
    ]
    result.append({"num_boys_girls": {"years": years}})


def get_num_participants_per_year(storage, result):
    years = [
        {"year": c.year, "num_participants": len(c.participations)}
        for c in storage.contests.values()
    ]
    result.append({"num_participants_per_year": {"years": years}})


def get_most_used_location(storage, result):
    locations = defaultdict(list)
    for c in storage.contests.values():
        locations[c.location].append(c)
    locations = sorted(locations.items(), key=lambda x: len(x[1]), reverse=True)

    if len(locations[0][1]) == len(locations[1][1]):
        logger.debug("No most_used_location due to ex-aequo")
        return

    result.append(
        {
            "most_used_location": {
                "location": locations[0][1][0].location_info,
                "years": [c.year for c in locations[0][1]],
            }
        }
    )


def contest(storage):
    result = []
    get_contest_with_most_participants(storage, result)
    get_contest_with_most_ex_aequo(storage, result)
    get_most_northern_contest(storage, result)
    get_most_southern_contest(storage, result)
    get_contest_with_most_girls(storage, result)
    get_num_boys_girls(storage, result)
    get_num_participants_per_year(storage, result)
    get_most_used_location(storage, result)
    return result


###############################################################################


def homepage(storage):
    return {
        "region": region(storage),
        "user": user(storage),
        "task": task(storage),
        "contest": contest(storage),
    }
