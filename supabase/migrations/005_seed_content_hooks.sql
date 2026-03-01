-- ============================================================
-- VOLT Sleep — Seed Data: Top 50 Hooks
-- ============================================================
-- Run after 004_content_ops.sql
-- All hooks start at weight 1.0 (boosted to 2.0 when they win)
-- ============================================================

INSERT INTO public.content_topics (angle, hook, variation_index, locale) VALUES
-- ANGLE A: Caffeine Timing
('caffeine_timing', 'Your coffee after 2 PM is stealing tomorrow''s energy.', 0, 'en'),
('caffeine_timing', 'Stop drinking coffee when you''re tired. Here''s why.', 1, 'en'),
('caffeine_timing', 'I cut caffeine after 1 PM. Day 3 was insane.', 2, 'en'),
('caffeine_timing', 'Your 3 PM coffee isn''t giving you energy — it''s borrowing it.', 3, 'en'),
('caffeine_timing', 'The caffeine timing rule that changed my focus.', 4, 'en'),
('caffeine_timing', 'Why your afternoon coffee makes Monday worse.', 5, 'en'),
('caffeine_timing', '3 things caffeine does after 2 PM (and none are good).', 6, 'en'),
('caffeine_timing', 'Is your afternoon coffee secretly ruining your mornings?', 7, 'en'),
('caffeine_timing', 'Try this for 5 days: no caffeine after 1 PM. Report back.', 8, 'en'),
('caffeine_timing', 'Caffeine has a half-life of 6 hours. Do the math.', 9, 'en'),

-- ANGLE B: Energy Crashes
('energy_crash', 'Your 3 PM crash is not about food.', 0, 'en'),
('energy_crash', 'I fixed my afternoon crash in 4 days. No supplements.', 1, 'en'),
('energy_crash', 'The real reason you crash at 3 PM (it''s not blood sugar).', 2, 'en'),
('energy_crash', 'Stop blaming lunch for your energy crash.', 3, 'en'),
('energy_crash', 'Your energy crash is a scheduling problem, not a food problem.', 4, 'en'),
('energy_crash', 'I tracked my energy for 7 days. The pattern was obvious.', 5, 'en'),
('energy_crash', 'Your body dips 7-9 hours after waking. It''s biology.', 6, 'en'),
('energy_crash', 'The 90-minute energy cycle nobody talks about.', 7, 'en'),
('energy_crash', 'Your energy isn''t random. It''s predictable.', 8, 'en'),
('energy_crash', 'Why napping at 3 PM works but coffee doesn''t.', 9, 'en'),

-- ANGLE C: Weekend Rhythm
('weekend_rhythm', 'Sleeping in on weekends is sabotaging your Monday.', 0, 'en'),
('weekend_rhythm', 'Social jetlag is why your Mondays suck.', 1, 'en'),
('weekend_rhythm', 'Your weekend lie-in costs you 2 days of focus.', 2, 'en'),
('weekend_rhythm', 'I stopped sleeping in on weekends. Here''s what changed.', 3, 'en'),
('weekend_rhythm', 'The 90-minute rule that fixed my Mondays.', 4, 'en'),
('weekend_rhythm', 'Your body doesn''t know it''s Saturday.', 5, 'en'),
('weekend_rhythm', 'Every extra hour of weekend sleep = 30 min less Monday focus.', 6, 'en'),
('weekend_rhythm', 'Sunday catch-up sleep is a trap. Here''s why.', 7, 'en'),
('weekend_rhythm', 'Your Monday brain fog starts on Saturday morning.', 8, 'en'),
('weekend_rhythm', 'The #1 thing ruining your week (and it''s your weekend).', 9, 'en'),

-- ANGLE D: Focus & Performance
('focus_performance', 'The #1 focus hack is free and takes 0 minutes.', 0, 'en'),
('focus_performance', 'Your focus isn''t broken. Your rhythm is.', 1, 'en'),
('focus_performance', 'High performers don''t have more willpower. They have better rhythms.', 2, 'en'),
('focus_performance', 'I added 2 hours of deep work without changing my schedule.', 3, 'en'),
('focus_performance', 'The energy trick every productive person uses (but never talks about).', 4, 'en'),
('focus_performance', 'Your morning routine is useless without this one thing.', 5, 'en'),
('focus_performance', 'Stop optimizing your morning. Fix your evening first.', 6, 'en'),
('focus_performance', 'The 45-second habit that doubled my afternoon focus.', 7, 'en'),
('focus_performance', 'Why your to-do list doesn''t work after 2 PM.', 8, 'en'),
('focus_performance', 'Peak performance isn''t about discipline. It''s about timing.', 9, 'en'),

-- ANGLE E: Light Exposure
('light_exposure', '12 minutes of morning light changed my entire day.', 0, 'en'),
('light_exposure', 'The free hack that beats every supplement for energy.', 1, 'en'),
('light_exposure', 'Your alarm isn''t the problem. Your light exposure is.', 2, 'en'),
('light_exposure', 'The first 60 minutes after waking decide your entire day.', 3, 'en'),
('light_exposure', 'Night owls: this one change makes mornings bearable.', 4, 'en'),
('light_exposure', 'Why you feel tired even after 8 hours of sleep.', 5, 'en'),
('light_exposure', 'Morning light isn''t about waking up. It''s about staying awake at 3 PM.', 6, 'en'),
('light_exposure', 'Your phone''s blue light at night is worse than you think.', 7, 'en'),
('light_exposure', 'The sunset rule that improved my sleep in 3 days.', 8, 'en'),
('light_exposure', 'Bright mornings, dim evenings. That''s the entire secret.', 9, 'en')
ON CONFLICT DO NOTHING;
