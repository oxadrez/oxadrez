module.exports = `


# Fairy-Stockfish, a UCI chess variant playing engine derived from Stockfish
# Copyright (C) 2018-2022 Fabian Fichter
#
# Fairy-Stockfish is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# Fairy-Stockfish is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.

# This is a configuration file to add user-defined variants to Fairy-Stockfish.

################################################
### Usage:
# Add "load" and the file path to the SF call (e.g., "stockfish.exe load variants.ini")
# or set the UCI option "VariantPath" to the path of this file in order to load it.
# In order to validate the configuration without actually loading the variants
# run "stockfish.exe check variants.ini", which reports potential config errors.

################################################
### Variant configuration:
# The variant name needs to be specified as a section in square brackets,
# followed by its rule configurations as key-value pairs as described below.
# If you encounter problems configuring variants, please report them at:
# https://github.com/ianfab/Fairy-Stockfish/issues

### Inheritance
# If a variant is similar to a previously defined variant,
# inheritance can be used to simplify the definition. To inherit from the
# configuration of an existing variant, specify the parent variant after the child
# variant name separated by a colon, e.g., [gothic:capablanca].
# When inheritance is used, only the differences to the parent variant need to be defined,
# see the examples in this file, e.g., 3check-crazyhouse.
# When no inheritance is used, the default template applies,
# which is basically standard chess but without any predefined pieces.

### Piece types
# Firstly, the piece types for a variant need to be defined.
# For that, specify the letter used for each piece type, e.g.:
# pawn = p
#
# See the list below for all available predefined piece types (and their Betza notation):
# pawn (fmWfceF)
# knight (N)
# bishop (B)
# rook (R)
# queen (Q)
# fers (F)
# alfil (A)
# fersAlfil (FA)
# silver (FfW)
# aiwok (RNF)
# bers (RF)
# archbishop (BN)
# chancellor (RN)
# amazon (QN)
# knibis (mNcB)
# biskni (mBcN)
# kniroo (mNcR)
# rookni (mRcN)
# shogiPawn (fW)
# lance (fR)
# shogiKnight (fN)
# gold (WfF)
# dragonHorse (BW)
# clobber (cW)
# breakthrough (fmWfF)
# immobile ()
# cannon (mRcpR)
# janggiCannon (pR)
# soldier (fsW)
# horse (nN)
# elephant (nA)
# janggiElephant (nZ)
# banner (RcpRnN)
# wazir (W)
# commoner (K)
# centaur (KN)
# king (K)

### Custom pieces
# Custom pieces can be defined by using one of the available slots:
# customPiece1, customPiece2, ..., customPiece25
# E.g., pawns without double steps could be described as:
# customPiece1 = p:mfWcfF
#
# You can define custom king movements in the same way you can define another custom piece.
# E.g., to make the king move like a centaur:
# king = k:KN
# In contrast to other custom pieces the Betza notation for the king is optional though
# and defaults to a standard chess king (betza: K) when skipped, e.g.:
# king = k
#
# The movements of custom pieces can be defined using the Betza notation.
# https://www.gnu.org/software/xboard/Betza.html
# In Fairy-Stockfish only a subset of Betza notation can be used. The supported features are:
# - all base moves/atoms (W, F, etc.)
# - all directional modifiers (f, b, etc.)
# - limited and unlimited distance sliders/riders for W/R, F/B, and N directions
# - hoppers and grasshoppers for W/R and F/B directions, i.e., pR, pB, gR, and gB
# - lame leapers (n) for N, A, Z, and D directions, i.e., nN, nA, nZ, and nD

### Piece values
# The predefined and precalculated piece values can be overridden
# by specifying the pieceValueMg and pieceValueEg options, e.g.,
# pieceValueMg = p:150 n:800
# pieceValueEg = p:200 n:900
#
# For orientation, the internal predefined piece values can be found in types.h.
# A suitable piece for gauging the piece values is the rook, which internally has:
# pieceValueMg = r:1276
# pieceValueEg = r:1380

### Option types
# [bool]: boolean flag to enable/disable a feature [true, false]
# [Rank]: denotes a rank of the board [1-10]
# [File]: denotes a file of the board [1-12, a-i]
# [int]: any natural number [0, 1, ...]
# [PieceType]: a piece type [letters defined for pieces, e.g., p]
# [PieceSet]: multiple piece types [letters defined for pieces, e.g., nbrq]
# [CastlingRights]: set of castling rights [letters for castling rights as in FEN, e.g., KQkq]
# [Bitboard]: list of squares [e.g., d4 e4 d5 e5]. * can be used as wildcard for files (e.g., *1 is the first rank)
# [Value]: game result for the side to move [win, loss, draw]
# [MaterialCounting]: material counting rules for adjudication [janggi, unweighted, whitedrawodds, blackdrawodds, none]
# [CountingRule]: makruk, cambodian, or ASEAN counting rules [makruk, cambodian, asean, none]
# [ChasingRule]: xiangqi chasing rules [axf, none]
# [EnclosingRule]: reversi, ataxx, etc. enclosing rules [reversi, ataxx, quadwrangle, snort, anyside, top, none]
# - in enclosingDrop:
#  - reversi: must enclose opponent's pieces between yours by Queen move
#  - ataxx: must be adjacent to own piece by King move
#  - snort: most *not* be adjacent to opponent's piece by Wazir move
#  - anyside: must be reached by inserting from an edge and sliding to opposite edge
#  - top: must be reached by inserting from top and sliding to bottom (ie. Connect 4)
# - in flipEnclosedPieces:
#  - reversi: flip opponent's pieces enclosed between yours by Queen move
#  - quadwrangle: if a normal move *or* a drop with a friendly piece adjacent by King move, then flip opponent's pieces adjacent by King move
#  - ataxx: flip opponent's pieces adjacent by King move
# [WallingRule]: wall-placing rule [arrow, duck, edge, past, static, none]
# - arrow: copies piece movement (ie. Game of the Amazons)
# - duck: mobile square (ie. Duck chess)
# - edge: edges of board, opening up new edges (ie. Atlantis)
# - past: previous square (ie. Snailtrail)
# - static: unchanging mask (ie. Isolation)

### Additional options relevant for usage in Winboard/XBoard
# A few options only have the purpose of improving compatibility with Winboard/Xboard.
# These do not need to be specified when using other GUIs, but can be essential for Winboard/Xboard.
#
# variantTemplate: base variant to inherit GUI logic from [values: fairy, shogi, bughouse] (default: fairy)
# pieceToCharTable: mapping of piece characters to images,
#                   see https://www.gnu.org/software/xboard/whats_new/4.9.0/index.html#tag-B1 (default: -)
# pocketSize: number of pockets shown by XBoard/WinBoard for drop variants [int] (default: 0)

### Rule definition options
# maxRank: maximum rank [Rank] (default: 8)
# maxFile: maximum file [File] (default: 8)
# chess960: allow chess960 castling [bool] (default: false)
# twoBoards: pocket pieces are added from an external source, usually from a second board (e.g., bughouse) [bool] (default: false)
# startFen: FEN of starting position (default: rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1)
# mobilityRegion: the mobility area can be defined via options specific to color and piece,
#                 .e.g., mobilityRegionWhiteRook, mobilityRegionBlackJanggiElephant, etc. [Bitboard]
# pawnTypes: define pieces considered as "pawns" for promotion, en passant, and n move rule [PieceSet] (default: p)
#            see promotionPawnTypes, enPassantTypes, and nMoveRuleTypes for more specific overrides.
# promotionRegionWhite: region where promotions are allowed for white [Bitboard] (default: *8)
# promotionRegionBlack: region where promotions are allowed for black [Bitboard] (default: *1)
# promotionPawnTypes: promotion pawn types for both colors [PieceSet] (default: p)
# promotionPawnTypesWhite: white promotion pawn types [PieceSet] (default: p)
# promotionPawnTypesBlack: black promotion pawn types [PieceSet] (default: p)
# promotionPieceTypes: pawn promotion options [PieceSet] (default: nbrq)
# promotionPieceTypesWhite: white pawn promotion options [PieceSet] (default: nbrq)
# promotionPieceTypesBlack: black pawn promotion options [PieceSet] (default: nbrq)
# sittuyinPromotion: enable Sittuyin-style pawn promotion [bool] (default: false)
# promotionLimit: maximum number of pieces of a type, e.g., q:1 r:2 (default: )
# promotedPieceType: mapping between unpromoted and promoted non-pawn piece types, e.g., p:g s:g (default: )
# piecePromotionOnCapture: piece promotion only allowed on captures (e.g., micro shogi) [bool] (default: false)
# mandatoryPawnPromotion: pawn promotion is mandatory [bool] (default: true)
# mandatoryPiecePromotion: piece promotion (and demotion if enabled) is mandatory [bool] (default: false)
# pieceDemotion: enable demotion of pieces (e.g., Kyoto shogi) [bool] (default: false)
# blastOnCapture: captures explode all adjacent non-pawn pieces (e.g., atomic chess) [bool] (default: false)
# blastImmuneTypes: pieces completely immune to explosions (even at ground zero) [PieceSet] (default: none)
# mutuallyImmuneTypes: pieces that can't capture another piece of same types (e.g., kings (commoners) in atomar) [PieceSet] (default: none)
# petrifyOnCaptureTypes: defined pieces are turned into wall squares when capturing [PieceSet] (default: -)
# petrifyBlastPieces: if petrify and blast combined, should pieces destroyed in the blast be petrified? [bool] (default: false)
# doubleStep: enable pawn double step [bool] (default: true)
# doubleStepRegionWhite: region where pawn double steps are allowed for white [Bitboard] (default: *2)
# doubleStepRegionBlack: region where pawn double steps are allowed for black [Bitboard] (default: *7)
# tripleStepRegionWhite: region where pawn triple steps are allowed for white [Bitboard] (default: -)
# tripleStepRegionBlack: region where pawn triple steps are allowed for black [Bitboard] (default: -)
# enPassantRegion: define region (target squares) where en passant is allowed after double steps [Bitboard] (default: AllSquares)
# enPassantTypes: define pieces able to capture en passant [PieceSet] (default: p)
# enPassantTypesWhite: define white pieces able to capture en passant [PieceSet] (default: p)
# enPassantTypesBlack: define black pieces able to capture en passant [PieceSet] (default: p)
# castling: enable castling [bool] (default: true)
# castlingDroppedPiece: enable castling with dropped rooks/kings [bool] (default: false)
# castlingKingsideFile: destination file of king after kingside castling [File] (default: g)
# castlingQueensideFile: destination file of king after queenside castling [File] (default: c)
# castlingRank: relative rank of castling [Rank] (default: 1)
# castlingKingFile: starting file of the castlingKingPiece if there can be more than one of that type [File] (default: e)
# castlingKingPiece: first piece type that participates in castling [PieceType] (default: k)
# castlingRookKingsideFile: starting file of castlingRookPieces on kingside (if not in corner) [File] (default: l)
# castlingRookQueensideFile: starting file of castlingRookPieces on queenside (if not in corner) [File] (default: a)
# castlingRookPieces: second piece type that participates in castling [PieceSet] (default: r)
# oppositeCastling: can't castle same side as opponent [bool] (default: false)
# checking: allow checks [bool] (default: true)
# dropChecks: allow checks by piece drops [bool] (default: true)
# mustCapture: captures are mandatory (check evasion still takes precedence) [bool] (default: false)
# mustDrop: drops are mandatory (e.g., for Sittuyin setup phase) [bool] (default: false)
# mustDropType: piece type for which piece drops are mandatory [PieceType] (default: *)
# pieceDrops: enable piece drops [bool] (default: false)
# dropLoop: captures promoted pieces are not demoted [bool] (default: false)
# capturesToHand: captured pieces go to opponent's hand [bool] (default: false)
# firstRankPawnDrops: allow pawn drops to first rank [bool] (default: false)
# promotionZonePawnDrops: allow pawn drops in promotion zone  [bool] (default: false)
# dropOnTop: DEPRECATED, use "enclosingDrop = top"
# enclosingDrop: require piece drop to enclose pieces [EnclosingRule] (default: none)
# enclosingDropStart: drop region for starting phase disregarding enclosingDrop (e.g., for reversi) [Bitboard]
# whiteDropRegion: restrict region for piece drops of all white pieces [Bitboard]
# blackDropRegion: restrict region for piece drops of all black pieces [Bitboard]
# sittuyinRookDrop: restrict region of rook drops to first rank [bool] (default: false)
# dropOppositeColoredBishop: dropped bishops have to be on opposite-colored squares [bool] (default: false)
# dropPromoted: pieces may be dropped in promoted state [bool] (default: false)
# dropNoDoubled: specified piece type can not be dropped to the same file (e.g. shogi pawn) [PieceType] (default: -)
# dropNoDoubledCount: specifies the count of already existing pieces for dropNoDoubled [int] (default: 1)
# immobilityIllegal: pieces may not move to squares where they can never move from [bool] (default: false)
# gating: maintain squares on backrank with extra rights in castling field of FEN [bool] (default: false)
# wallingRule: rule on where wall can be placed [WallingRule] (default: none)
# wallingRegionWhite: mask where wall squares (including duck) can be placed by white [Bitboard] (default: all squares)
# wallingRegionBlack: mask where wall squares (including duck) can be placed by black [Bitboard] (default: all squares)
# seirawanGating: allow gating of pieces in hand like in S-Chess, requires "gating = true" [bool] (default: false)
# cambodianMoves: enable special moves of cambodian chess, requires "gating = true" [bool] (default: false)
# diagonalLines: enable special moves along diagonal for specific squares (Janggi) [Bitboard]
# pass: allow passing [bool] (default: false)
# passOnStalemate: allow passing in case of stalemate [bool] (default: false)
# makpongRule: the king may not move away from check [bool] (default: false)
# flyingGeneral: disallow general face-off like in xiangqi [bool] (default: false)
# soldierPromotionRank: restrict soldier to shogi pawn movements until reaching n-th rank [Rank] (default: 1)
# flipEnclosedPieces: change color of pieces that are enclosed by a drop [EnclosingRule] (default: none)
# nMoveRuleTypes: define pieces resetting n move rule [PieceSet] (default: p)
# nMoveRuleTypesWhite: define white pieces resetting n move rule [PieceSet] (default: p)
# nMoveRuleTypesBlack: define black pieces resetting n move rule [PieceSet] (default: p)
# nMoveRule: move count for 50/n-move rule [int] (default: 50)
# nFoldRule: move count for 3/n-fold repetition rule [int] (default: 3)
# nFoldValue: result in case of 3/n-fold repetition [Value] (default: draw)
# nFoldValueAbsolute: result in case of 3/n-fold repetition is from white's point of view [bool] (default: false)
# perpetualCheckIllegal: prohibit perpetual checks [bool] (default: false)
# moveRepetitionIllegal: prohibit moving back and forth with the same piece nFoldRule-1 times [bool] (default: false)
# chasingRule: enable chasing rules [ChasingRule] (default: none)
# stalemateValue: result in case of stalemate [Value] (default: draw)
# stalematePieceCount: count material in case of stalemate [bool] (default: false)
# checkmateValue: result in case of checkmate [Value] (default: loss)
# shogiPawnDropMateIllegal: prohibit checkmate via shogi pawn drops [bool] (default: false)
# shatarMateRule: enable shatar mating rules [bool] (default: false)
# bikjangRule: consider Janggi bikjang (facing kings) rule [bool] (default: false)
# extinctionValue: result when one of extinctionPieceTypes is extinct [Value] (default: none)
# extinctionClaim: extinction of opponent pieces can only be claimed as side to move [bool] (default: false)
# extinctionPseudoRoyal: treat the last extinction piece like a royal piece [bool] (default: false)
# dupleCheck: when all pseudo-royal pieces are attacked, it counts as a check [bool] (default: false)
# extinctionPieceTypes: list of piece types for extinction rules, e.g., pnbrq (* means all) (default: )
# extinctionPieceCount: piece count at which the game is decided by extinction rule (default: 0)
# extinctionOpponentPieceCount: opponent piece count required to adjudicate by extinction rule (default: 0)
# flagPiece: piece type for capture the flag win rule [PieceType] (default: *)
# flagPieceWhite: piece type for capture the flag win rule [PieceType] (default: *)
# flagPieceBlack: piece type for capture the flag win rule [PieceType] (default: *)
# flagRegion: target region for capture the flag win rule [Bitboard] (default: )
# flagRegionWhite: white's target region for capture the flag win rule [Bitboard] (default: )
# flagRegionBlack: black's target region for capture the flag win rule [Bitboard] (default: )
# flagPieceCount: number of flag pieces that have to be in the flag zone [int] (default: 1)
# flagPieceBlockedWin: for flagPieceCount > 1, win if at least one flag piece in flag zone and all others occupied by pieces [bool] (default: false)
# flagMove: the other side gets one more move after one reaches the flag zone [bool] (default: false)
# flagPieceSafe: the flag piece must be safe to win [bool] (default: false)
# checkCounting: enable check count win rule (check count is communicated via FEN, see 3check) [bool] (default: false)
# connectN: number of aligned pieces for win [int] (default: 0)
# connectVertical: connectN looks at Vertical rows [bool] (default: true)
# connectHorizontal: connectN looks at Horizontal rows [bool] (default: true)
# connectDiagonal: connectN looks at Diagonal rows [bool] (default: true)
# connectNxN: connect a tight NxN square for win [int] (default: 0)
# materialCounting: enable material counting rules [MaterialCounting] (default: none)
# countingRule: enable counting rules [CountingRule] (default: none)
# castlingWins: Specified castling moves are win conditions. Losing these rights is losing. [CastlingRights] (default: -)

################################################
### Example for minishogi configuration that would be equivalent to the built-in variant:

# [minishogi]
# variantTemplate = shogi
# maxRank = 5
# maxFile = 5
# shogiPawn = p
# silver = s
# gold = g
# bishop = b
# dragonHorse = h
# rook = r
# bers = d
# king = k
# startFen = rbsgk/4p/5/P4/KGSBR[-] w 0 1
# pieceDrops = true
# capturesToHand = true
# promotionRegionWhite = *5
# promotionRegionBlack = *1
# doubleStep = false
# castling = false
# promotedPieceType = p:g s:g b:h r:d
# dropNoDoubled = p
# immobilityIllegal = true
# shogiPawnDropMateIllegal = true
# stalemateValue = loss
# nFoldRule = 4
# nMoveRule = 0
# perpetualCheckIllegal = true
# pocketSize = 5
# nFoldValue = loss
# nFoldValueAbsolute = true

# pawns with extra sideways and backwards movement
# example for defining a custom pawn type
# resetting the original "p" piece with "pawn = -" is optional as already done implicitly
[allwayspawns:chess]
customPiece1 = p:mWfceFifmnD
pawnTypes = p

# Hybrid variant of three-check chess and crazyhouse, using crazyhouse as a template
[3check-crazyhouse:crazyhouse]
startFen = rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR[] w KQkq - 3+3 0 1
checkCounting = true

# Hybrid variant of atomic and giveaway
[atomic-giveaway:giveaway]
blastOnCapture = true

# Hybrid variant of atomic, giveaway, and king of the hill
[atomic-giveaway-hill:giveaway]
blastOnCapture = true
flagPiece = k
flagRegion = d4 e4 d5 e5

# Crazyhouse with mandatory captures, using crazyhouse as a template
[coffeehouse:crazyhouse]
mustCapture = true

# Hybrid variant of makruk and crazyhouse
[makhouse:makruk]
startFen = rnsmksnr/8/pppppppp/8/8/PPPPPPPP/8/RNSKMSNR[] w - - 0 1
pieceDrops = true
capturesToHand = true
firstRankPawnDrops = true
promotionZonePawnDrops = true
immobilityIllegal = true

# Hybrid variant of xiangqi and crazyhouse
[xiangqihouse:xiangqi]
startFen = rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR[] w - - 0 1
pieceDrops = true
capturesToHand = true
dropChecks = false
whiteDropRegion = *1 *2 *3 *4 *5
blackDropRegion = *6 *7 *8 *9 *10
mobilityRegionWhiteFers = d1 f1 e2 d3 f3
mobilityRegionBlackFers = d8 f8 e9 d10 f10
mobilityRegionWhiteElephant = c1 g1 a3 e3 i3 c5 g5
mobilityRegionBlackElephant = c6 g6 a8 e8 i8 c10 g10
mobilityRegionWhiteSoldier = a4 a5 c4 c5 e4 e5 g4 g5 i4 i5 *6 *7 *8 *9 *10
mobilityRegionBlackSoldier = *1 *2 *3 *4 *5 a6 a7 c6 c7 e6 e7 g6 g7 i6 i7

# Hybrid variant of janggi and crazyhouse
[janggihouse:janggi]
startFen = rnba1abnr/4k4/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/4K4/RNBA1ABNR[] w - - 0 1
pieceDrops = true
capturesToHand = true

# Hybrid variant of antichess and losalamos
[anti-losalamos:losalamos]
king = -
commoner = k
promotionPieceTypes = nrqk
mustCapture = true
stalemateValue = win
extinctionValue = win
extinctionPieceTypes = *

# Indian great chess
# https://www.chessvariants.com/historic.dir/indiangr1.html
[indiangreat]
pieceToCharTable = PNBRQ..VW.........G..Kpnbrq..vw.........g..k
pawn = p
knight = n
bishop = b
rook = r
queen = q
king = k
archbishop = v
chancellor = w
amazon = g
maxRank = 10
maxFile = 10
startFen = rnbqkgvbnr/ppppwwpppp/4pp4/10/10/10/10/4PP4/PPPPWWPPPP/RNBVGKQBNR w - - 0 1
promotionRegionWhite = *10
promotionRegionBlack = *1
promotionPieceTypes = q
doubleStep = false
castling = false

# Centaurking
# A variant demonstrating how to define a custom royal piece movement
[centaurking:chess]
king = k:KN

# Mahajarah and the Sepoys
# https://en.wikipedia.org/wiki/Maharajah_and_the_Sepoys
[maharajah]
pawn = p
knight = n
bishop = b
rook = r
queen = q
king = k
amazon = m
pieceToCharTable = PNBRQ.............MKpnbrq.............mk
startFen = rnbqkbnr/pppppppp/8/8/8/8/8/4M3 w kq - 0 1
extinctionValue = loss
extinctionPieceTypes = m
extinctionPseudoRoyal = true

# Maharajah
# https://vchess.club/#/variants/Maharajah (Balanced version of Maharajah and the Sepoys)
[maharajah2:maharajah]
amazon = -
customPiece1 = m:QNAD
pieceToCharTable = PNBRQ.............MKpnbrq.............mk
startFen = 3mm3/8/8/8/8/8/PPPPPPPP/RNBQKBNR w KQ - 0 1
extinctionPieceTypes = m

# Upside-down
[upsidedown:chess]
startFen = RNBKQBNR/PPPPPPPP/8/8/8/8/pppppppp/rnbkqbnr w - - 0 1

# Peasant revolt
# https://www.chessvariants.com/large.dir/peasantrevolt.html
[peasant:chess]
startFen = 1nn1k1n1/4p3/8/8/8/8/PPPPPPPP/4K3 w - - 0 1

# https://www.chessvariants.com/unequal.dir/weak.html
[weak:chess]
startFen = nnnnknnn/pppppppp/2p2p2/1pppppp1/8/8/PPPPPPPP/RNBQKBNR w KQ - 0 1

# Semi-torpedo chess
[semitorpedo:chess]
doubleStepRegionWhite = *2 *3
doubleStepRegionBlack = *7 *6

# This variant is similar to Capablanca Chess, but with two archbishops and no chancellor piece.
[gemini:janus]
startFen = rnbaqkabnr/pppppppppp/10/10/10/10/PPPPPPPPPP/RNBAQKABNR w KQkq - 0 1
archbishop = a
pieceToCharTable = PNBRQ............A...Kpnbrq............a...k
castlingKingsideFile = i
castlingQueensideFile = c

# https://www.chessvariants.com/diffsetup.dir/pawnsonly.html
[pawnsonly]
pawn = p
queen = q
startFen = 8/pppppppp/8/8/8/8/PPPPPPPP/8 w - - 0 1
promotionPieceTypes = q
castling = false
stalemateValue = loss
flagPiece = q
flagRegionWhite = *8
flagRegionBlack = *1

#https://github.com/yagu0/vchess/blob/master/client/src/translations/rules/Pawnsking/en.pug
[pawnsking:pawnsonly]
commoner = k
flagPiece = *
startFen = 4k3/pppppppp/8/8/8/8/PPPPPPPP/4K3 w - - 0 1
extinctionValue = loss
extinctionPieceTypes = k
stalemateValue = draw

[tictactoe]
maxRank = 3
maxFile = 3
immobile = p
startFen = 3/3/3[PPPPPpppp] w - - 0 1
pieceDrops = true
doubleStep = false
castling = false
stalemateValue = draw
immobilityIllegal = false
connectN = 3

[cfour]
maxRank = 6
maxFile = 7
immobile = p
startFen = 7/7/7/7/7/7[PPPPPPPPPPPPPPPPPPPPPppppppppppppppppppppp] w - - 0 1
pieceDrops = true
enclosingDrop = top
doubleStep = false
castling = false
stalemateValue = draw
immobilityIllegal = false
connectN = 4
nMoveRule = 0

[flipello6:flipello]
maxRank = 6
maxFile = 6
startFen = 6/6/2pP2/2Pp2/6/6[PPPPPPPPPPPPPPPPPPPPPPpppppppppppppppppppppp] w 0 1
enclosingDropStart = c3 d3 c4 d4

[grandhouse:grand]
startFen = r8r/1nbqkcabn1/pppppppppp/10/10/10/10/PPPPPPPPPP/1NBQKCABN1/R8R[] w - - 0 1
pieceDrops = true
capturesToHand = true

[shogun:crazyhouse]
variantTemplate = shogi
pieceToCharTable = PNBR.F.....++++.+Kpnbr.f.....++++.+k
pocketSize = 8
startFen = rnb+fkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNB+FKBNR[] w KQkq - 0 1
commoner = c
centaur = g
archbishop = a
chancellor = m
fers = f
promotionRegionWhite = *6 *7 *8
promotionRegionBlack = *3 *2 *1
promotionLimit = g:1 a:1 m:1 q:1
promotionPieceTypes = -
promotedPieceType = p:c n:g b:a r:m f:q
mandatoryPawnPromotion = false
firstRankPawnDrops = true
promotionZonePawnDrops = true
whiteDropRegion = *1 *2 *3 *4 *5
blackDropRegion = *4 *5 *6 *7 *8
immobilityIllegal = true

#https://www.chess.com/variants/caught-in-a-snag
[caught-in-a-snag:chess]
pieceToCharTable = P..........GUFW......Mp..........gufw......m
maxRank = 6
pawnTypes = p
fers = f
horse = u
wazir = w
centaur = m
king = g:gBgR
customPiece1 = p:fmWfcF
startFen = fuwmgwuf/pppppppp/8/8/PPPPPPPP/FUWGMWUF w - - 0 1
stalemateValue = win
promotionPawnTypes = -

#https://www.chess.com/variants/minihouse
[minihouse:crazyhouse]
maxRank = 6
maxFile = 6
startFen = 2bnrk/5p/6/6/P5/KRNB2

#https://www.chess.com/variants/rookmate
[rookmate:chess]
#in this variant, one rook is royal, one isn't
#to define this, the royal rook will be a king(K) with custom moves, and the non-royal king a commoner(C)
pieceToCharTable = PNBRQC...............Kpnbrqc...............k
startFen = rnbqcbnk/pppppppp/8/8/8/8/PPPPPPPP/RNBQCBNK w 7+7 0 1
king = k:R
commoner = c
extinctionPieceCount = 1
extinctionValue = loss
extinctionPieceTypes = *

# Asymmetric variant with one army using pieces that move like knights but attack like other pieces (kniroo and knibis)
[orda:chess]
pieceToCharTable = PNBRQ..AH...........LKp...q..ah.y.........lk
centaur = h
knibis = a
kniroo = l
silver = y
promotionPieceTypes = qh
startFen = lhaykahl/8/pppppppp/8/8/8/PPPPPPPP/RNBQKBNR w KQ - 0 1
flagPiece = k
flagRegionWhite = *8
flagRegionBlack = *1

# Ordamirror
# https://vchess.club/#/variants/Ordamirror
[ordamirror:chess]
pieceToCharTable = P...Q..AH.F.........LKp...q..ah.f.........lk
centaur = h
knibis = a
kniroo = l
customPiece1 = f:mQcN
promotionPieceTypes = lhaf
startFen = lhafkahl/8/pppppppp/8/8/PPPPPPPP/8/LHAFKAHL w - - 0 1
flagPiece = k
flagRegionWhite = *8
flagRegionBlack = *1

# Hybrid variant of Gothic-chess and crazyhouse, using Capablanca as a template
[gothhouse:capablanca]
startFen = rnbqckabnr/pppppppppp/10/10/10/10/PPPPPPPPPP/RNBQCKABNR[] w KQkq - 0 1
pieceDrops = true
capturesToHand = true

# Synochess
# https://www.pychess.org/variant/synochess
[synochess:pocketknight]
pieceToCharTable = PNBRQAE...SCH........Kpnbrqae...sch........k
pocketSize = 8
janggiCannon = c
soldier = s
horse = h
fersAlfil = e
commoner = a
stalemateValue = loss
perpetualCheckIllegal = true
startFen = rneakenr/8/1c4c1/1ss2ss1/8/8/PPPPPPPP/RNBQKBNR[ss] w KQ - 0 1
flyingGeneral = true
capturesToHand = false
blackDropRegion = *5
flagPiece = k
flagRegionWhite = *8
flagRegionBlack = *1

# Capture chess
# https://vchess.club/#/variants/Capture
[capture:chess]
mustCapture = true

# Double Army chess
# https://vchess.club/#/variants/Doublearmy
[doublearmy:chess]
pieceToCharTable = PNBRQ.....C...........Kpnbrq.....c...........k
commoner = c
startFen = rnbqkbnr/pppppppp/rnbqcbnr/pppppppp/PPPPPPPP/RNBQCBNR/PPPPPPPP/RNBQKBNR w KQkq - 0 1

# Pawn Massacre chess
# https://vchess.club/#/variants/Pawnmassacre
[pawnsmassacre:chess]
startFen = RNBKQBNR/pppppppp/8/8/8/8/PPPPPPPP/rnbkqbnr w - - 0 1

# Screen chess (Below version assumes 1 drop per turn instead of the whole blind setup as in vchess)
# https://vchess.club/#/variants/Screen 
[screen:placement]
dropNoDoubled = p
startFen = 8/8/8/8/8/8/8/8[KQRRBBNNPPPPPPPPkqrrbbnnpppppppp] w - - 0 1
whiteDropRegion = *1 *2 *3 *4
blackDropRegion = *8 *7 *6 *5

# Crossing chess
# https://vchess.club/#/variants/Crossing
[crossing:kingofthehill]
flagRegionWhite = *5
flagRegionBlack = *4

# 4x5 Chess
# https://greenchess.net/rules.php?v=4x5-chess --> Solved draw
[4x5chess:gardner]
maxRank = 5
maxFile = d
startFen = rnbk/pppp/4/PPPP/RNBK w - - 0 1

# 4x6 Chess
# https://greenchess.net/rules.php?v=4x6-chess --> Solved draw
[4x6chess:gardner]
maxRank = 6
maxFile = d
promotionRegionWhite = *6
promotionRegionBlack = *1
startFen = rnbk/pppp/4/4/PPPP/RNBK w - - 0 1

# 5x6 chess
# https://greenchess.net/rules.php?v=5x6-chess
[5x6chess:gardner]
maxRank = 6
maxFile = e
promotionRegionWhite = *6
promotionRegionBlack = *1
startFen = rnbqk/ppppp/5/5/PPPPP/RNBQK w - - 0 1

# Active chess
# https://greenchess.net/rules.php?v=active
[active:chess]
maxFile = i
startFen = rnbkqbnrq/ppppppppp/9/9/9/9/PPPPPPPPP/RNBKQBNRQ w KQkq - 0 1

# Checkless 6x6 Atomic
[6x6atom:nocheckatomic]
extinctionPseudoRoyal = true
maxRank = 6
maxFile = f
promotionRegionWhite = *6
promotionRegionBlack = *1
doubleStep = false
startFen = rbqkbr/pppppp/6/6/PPPPPP/RBQKBR w - - 0 1

# Advanced Pawn chess
# https://greenchess.net/rules.php?v=advanced-pawn
[advancedpawn:chess]
doubleStep = false
startFen = rnbqkbnr/8/pppppppp/8/8/PPPPPPPP/8/RNBQKBNR w KQkq - 0 1

# Capture-all Chess
# https://greenchess.net/rules.php?v=capture-all
[captureall:extinction]
extinctionPieceTypes = *

# Corner Rook Chess
# https://greenchess.net/rules.php?v=corner-rook
[cornerrook:chess]
doubleStep = false
castling = false
startFen = r6r/1nbqkbn1/pppppppp/8/8/PPPPPPPP/1NBQKBN1/R6R w - - 0 1

# Diana Chess
# https://greenchess.net/rules.php?v=diana
[diana:losalamos]
pieceToCharTable = PNBRQ................Kpnbrq................k
bishop = b
promotionPieceTypes = rbn
castling = true
castlingKingsideFile = e
castlingQueensideFile = b
startFen = rbnkbr/pppppp/6/6/PPPPPP/RBNKBR w KQkq - 0 1

# Microchess
# https://greenchess.net/rules.php?v=microchess
[microchess:gardner]
maxRank = 5
maxFile = d
startFen = rbnk/p3/4/3P/RBNK w - - 0 1

# Empire Chess
# https://vchess.club/#/variants/Empire
[empire:chess]
pieceToCharTable = PNBRQ.....ST.C.D.E...Kpnbrq.....st.c.d.e...k
customPiece1 = e:mQcN
customPiece2 = c:mQcB
customPiece3 = t:mQcR
customPiece4 = d:mQcK
soldier = s
promotionPieceTypes = q
startFen = rnbqkbnr/pppppppp/8/8/8/PPPSSPPP/8/TECDKCET w kq - 0 1
stalemateValue = loss
nFoldValue = loss
flagPiece = k
flagRegionWhite = *8
flagRegionBlack = *1
flyingGeneral = true

# Shinobi Chess
# https://vchess.club/#/variants/Shinobi
[shinobi:chess]
variantTemplate = shogi
pieceToCharTable = PNBRQ.DJMLH.....CKpnbrq.djmlh.....ck
pocketSize = 8
commoner = c
bers = d
archbishop = j
fers = m
shogiKnight = h
lance = l
promotionRegionWhite = *7 *8
promotionRegionBlack = *2 *1
promotionPieceTypes = -
promotedPieceType = p:c m:b h:n l:r
mandatoryPiecePromotion = true
stalemateValue = loss
perpetualCheckIllegal = true
startFen = rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/LH1CK1HL[LHMMDJ] w kq - 0 1
pieceDrops = true
whiteDropRegion = *1 *2 *3 *4
blackDropRegion = *5 *6 *7 *8
immobilityIllegal = true
flagPiece = k
flagRegionWhite = *8
flagRegionBlack = *1

# Wildebeest
# https://vchess.club/#/variants/Wildebeest
# Limitations: No flexible castling, no pawn triple steps
[wildebeest:chess]
maxRank = 10
maxFile = k
customPiece1 = c:C
customPiece2 = w:NC
doubleStepRegionWhite = *2 *3
doubleStepRegionBlack = *9 *8
tripleStepRegionWhite = *2
tripleStepRegionBlack = *9
pieceToCharTable = PNBRQ.......C....WKpnbrq.......c....wk
startFen = rnccwkqbbnr/ppppppppppp/11/11/11/11/11/11/PPPPPPPPPPP/RNBBQKWCCNR w KQkq - 0 1
promotionPieceTypes = qw
promotionRegionWhite = *9 *10
promotionRegionBlack = *2 *1
mandatoryPawnPromotion = false
castling = false

# Pandemonium
# A variant that combines drops and powerful pieces, and there is no draw
# https://www.chessvariants.com/rules/pandemonium
[pandemonium]
variantTemplate = shogi
pieceToCharTable = PNBRFSA.UV.+++++++.++Kpnbrfsa.uv.+++++++.++k
maxFile = 9
maxRank = 9
pocketSize = 9
startFen = rnbsksbnr/2a1f1u2/p1p1p1p1p/4v4/9/4V4/P1P1P1P1P/2U1F1A2/RNBSKSBNR[] w - - 0 1
customPiece1 = o:NA
customPiece2 = s:WF
customPiece3 = u:D
customPiece4 = w:DWF
castling = false
pieceDrops = true
capturesToHand = true
immobilityIllegal = true
soldier = p
knight = n
bishop = b
rook = r
king = k
queen = q
commoner = g
dragonHorse = h
bers = d
alfil = a
archbishop = c
chancellor = m
fers = f
wazir = v
centaur = t
promotionRegionWhite = *7 *8 *9
promotionRegionBlack = *3 *2 *1
promotedPieceType = p:g n:o b:h r:d a:c v:m f:q s:w u:t
doubleStep = false
perpetualCheckIllegal = true
nMoveRule = 0
nFoldValue = loss
stalemateValue = loss
flagPiece = k
flagRegionWhite = *9
flagRegionBlack = *1

# 5x5 breakthrough
[breakthrough5:breakthrough]
maxFile = 5
maxRank = 5
startFen = ppppp/ppppp/5/PPPPP/PPPPP w 0 1
flagRegionWhite = *5
flagRegionBlack = *1

# 6x6 breakthrough
[breakthrough6:breakthrough]
maxFile = 6
maxRank = 6
startFen = pppppp/pppppp/6/6/PPPPPP/PPPPPP w 0 1
flagRegionWhite = *6
flagRegionBlack = *1

# 7x7 breakthrough
[breakthrough7:breakthrough]
maxFile = 7
maxRank = 7
startFen = ppppppp/ppppppp/7/7/7/PPPPPPP/PPPPPPP w 0 1
flagRegionWhite = *7
flagRegionBlack = *1


# 16x16
[board16:chess]
maxFile = 16
maxRank = 16
startFen = rnrnbbnqknbbnrnr/pppppppppppppppp/16/16/16/16/16/16/16/16/16/16/16/16/PPPPPPPPPPPPPPPP/RNRNBBNQKNBBNRNR w - - 0 1
flagRegionWhite = *16
flagRegionBlack = *1

# Mansindam (Pantheon tale)
# A variant that combines drop rule and powerful pieces, and there is no draw
[mansindam]
variantTemplate = shogi
pieceToCharTable = PNBR.Q.CMA.++++...++Kpnbr.q.cma.++++...++k
maxFile = 9
maxRank = 9
pocketSize = 8
startFen = rnbakqcnm/9/ppppppppp/9/9/9/PPPPPPPPP/9/MNCQKABNR[] w - - 0 1
pieceDrops = true
capturesToHand = true
shogiPawn = p
knight = n
bishop = b
rook = r
queen = q
archbishop = c
chancellor = m
amazon = a
king = k
commoner = g
centaur = e
dragonHorse = h
bers = t
customPiece1 = i:BNW
customPiece2 = s:RNF
promotionRegionWhite = *7 *8 *9
promotionRegionBlack = *3 *2 *1
doubleStep = false
castling = false
promotedPieceType = p:g n:e b:h r:t c:i m:s
dropNoDoubled = p
stalemateValue = loss
nMoveRule = 0
nFoldValue = loss
flagPiece = k
flagRegionWhite = *9
flagRegionBlack = *1
immobilityIllegal = true
mandatoryPiecePromotion = true

# Cross derby
# Pawns promote to a knight on the 8th rank. Checkmate or stalemate your opponent to win the game.
# https://www.chess.com/variants/cross-derby
[crossderby:chess]
pieceToCharTable = PN...................Kpn...................k
queen = -
rook = -
bishop = -
startFen = n*nnnn*k/**pppp**/pp4pp/8/8/PP4PP/**PPPP**/K*NNNN*N w - - 0 1
stalemateValue = loss

# Elimination chess
# Eliminate all the opponents' pieces but one to win. No checkmates, capturing is compulsory
# https://www.chess.com/variants/elimination-chess
[elimination:giveaway]
extinctionValue = loss
stalemateValue = loss
extinctionPieceCount = 1

# Hybrid variant of atomic and giveaway
[antiatomic:giveaway]
blastOnCapture = true
castling = false
extinctionOpponentPieceCount = 1

# Hybrid of atomic and Crazyhouse. --> SOLVED
[atomiczh:atomic]
dropChecks = false
pieceDrops = true
capturesToHand = true
pocketSize = 6
castling = false

# Misere Chess
# Get checkmated to win.
# Variant used to run some selfmate analysis http://www.kotesovec.cz/gustav/gustav_alybadix.htm
[misere:chess]
checkmateValue = win

# Chak
# Variant invented by Couch Tomato and inspired in the Mayan civilization
# https://www.pychess.org/variants/chak
[chak]
maxRank = 9
maxFile = 9
rook = r
knight = v
centaur = j
immobile = o
customPiece1 = s:FvW
customPiece2 = q:pQ
customPiece3 = d:mQ2cQ2
customPiece4 = p:fsmWfceF
customPiece5 = k:WF
customPiece6 = w:FvW
startFen = rvsqkjsvr/4o4/p1p1p1p1p/9/9/9/P1P1P1P1P/4O4/RVSJKQSVR w - - 0 1
mobilityRegionWhiteCustomPiece6 = *5 *6 *7 *8 *9
mobilityRegionWhiteCustomPiece3 = *5 *6 *7 *8 *9
mobilityRegionBlackCustomPiece6 = *1 *2 *3 *4 *5
mobilityRegionBlackCustomPiece3 = *1 *2 *3 *4 *5
promotionRegionWhite = *5 *6 *7 *8 *9
promotionRegionBlack = *5 *4 *3 *2 *1
promotionPieceTypes = -
mandatoryPiecePromotion = true
promotedPieceType = p:w k:d
extinctionValue = loss
extinctionPieceTypes = kd
extinctionPseudoRoyal = true
flagPiece = d
flagRegionWhite = e8
flagRegionBlack = e2
nMoveRule = 50
nFoldRule = 3
nFoldValue = draw
stalemateValue = loss

# Chennis
# Variant invented by Couch Tomato, tennis-themed and inspired in Kyoto Shogi
# https://www.pychess.org/variants/chennis
[chennis]
maxRank = 7
maxFile = 7
mobilityRegionWhiteKing = b1 c1 d1 e1 f1 b2 c2 d2 e2 f2 b3 c3 d3 e3 f3 b4 c4 d4 e4 f4
mobilityRegionBlackKing = b4 c4 d4 e4 f4 b5 c5 d5 e5 f5 b6 c6 d6 e6 f6 b7 c7 d7 e7 f7
customPiece1 = p:fmWfceF
cannon = c
commoner = m
fers = f
soldier = s
king = k
bishop = b
knight = n
rook = r
promotionPieceTypes = -
promotedPieceType = p:r f:c s:b m:n
promotionRegionWhite = *1 *2 *3 *4 *5 *6 *7
promotionRegionBlack = *7 *6 *5 *4 *3 *2 *1
startFen = 1fkm3/1p1s3/7/7/7/3S1P1/3MKF1[] w - 0 1
pieceDrops = true
capturesToHand = true
pieceDemotion = true
mandatoryPiecePromotion = true
dropPromoted = true
castling = false
stalemateValue = loss

# Gorogoro+
# 5x6 Shogi
# https://www.pychess.org/variants/gorogoroplus
[gorogoroplus:gorogoro]
startFen = sgkgs/5/1ppp1/1PPP1/5/SGKGS[LNln] w 0 1
lance = l
shogiKnight = n
promotedPieceType = l:g n:g
pieceToCharTable = P....SLN.G.+....+Kp....sln.g.+....+k

# Dragonfly
# Simplified Crazyhouse. Two rules have been removed from the original definition (Removing captured pawns and special pawn promotion). Credits to Procyon for the definition.
# https://en.wikipedia.org/wiki/Dragonfly_(chess_variant)
[dragonfly:chess]
maxFile = 7
maxRank = 7
pocketSize = 7
castlingKingsideFile = f
castlingQueensideFile = b
pieceDrops = true
capturesToHand = true
promotionRegionWhite = *7
promotionRegionBlack = *1
promotionPieceTypes = nbr
doubleStep = false
dropNoDoubled = p
dropNoDoubledCount = 0
startFen = rbbknnr/ppppppp/7/7/7/PPPPPPP/RBBKNNR[] w - - 0 1

# Kamikaze Rooks
# The objective of the game is to lose both rooks. Credits to Procyon for the definition.
# Variant defined in Pychess discord and previously playable with Chessboi bot.
[kamikazerooks:chess]
extinctionValue = win
extinctionPieceTypes = r

# Mounted
# Variant invented by Procyon. Credits to him for the definition.
# Variant defined in Pychess discord and previously playable with Chessboi bot.
[mounted]
maxRank = 7
maxFile = 7
pieceDrops = true
capturesToHand = true
stalemateValue = loss
nFoldValue = loss
extinctionValue = loss
extinctionPseudoRoyal = true
extinctionPieceTypes = k
flagPiece = k
flagRegionWhite = *7
flagRegionBlack = *1
centaur = k
bishop = b
rook = r
cannon = c
customPiece1 = a:mBcpB 
customPiece2 = s:FsfW
startFen = 1cbkra1/2s1s2/7/7/7/2S1S2/1CBKRA1 w - - 0 1

# Racing Chess
# Win by campmate. No checks allowed.
# Variant defined in Pychess discord and previously playable with Chessboi bot.
[racingchess:chess]
flagPiece = k
flagRegionWhite = *8
flagRegionBlack = *1
flagMove = true
checking = false

# Shinobi Mirror
# Symmetric version of Shinobi.
# Variant defined in Pychess discord and previously playable with Chessboi bot.
[shinobimirror:crazyhouse]
commoner = c
bers = d
archbishop = j
fers = m
shogiKnight = h
lance = l
pieceToCharTable = P.....DJMLH.....CKp.....djmlh.....ck
promotionRegionWhite = *7 *8
promotionRegionBlack = *2 *1
promotionPieceTypes = -
promotedPieceType = p:c m:b h:n l:r
mandatoryPiecePromotion = true
stalemateValue = loss
perpetualCheckIllegal = true
startFen = lh1ck1hl/pppppppp/8/8/8/8/PPPPPPPP/LH1CK1HL[LHMMDJlhmmdj] w - - 0 1
capturesToHand = false
whiteDropRegion = *1 *2 *3 *4
blackDropRegion = *5 *6 *7 *8
immobilityIllegal = true
flagPiece = k
flagRegionWhite = *8
flagRegionBlack = *1
castling = false

# Two Kings v2
# Slightly different implementation of Two Kings chess.
# Variant defined in Pychess discord and previously playable with Chessboi bot.
[twokings2:chess]
king = -
commoner = k
extinctionValue = loss
extinctionPseudoRoyal = true
extinctionPieceTypes = k
extinctionPieceCount = 1
startFen = rnbkkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBKKBNR w - - 0 1

# Anti-Antichess
# Lose at anti-chess to win at anti-antichess.
# Variant defined in Liantichess website. Credits to SriMethan for the definition.
[antiantichess:giveaway]
extinctionValue = loss
stalemateValue = loss
castling = false

# Anti-Minishogi
# Hybrid of antichess and minishogi. This might look like a coffee variant, but it isn't.
# Variant defined in Liantichess website. Credits to SriMethan for the definition.
[antiminishogi:minishogi]
king = -
commoner = k
mustCapture = true
stalemateValue = win
extinctionValue = win
extinctionPieceTypes = *
extinctionPseudoRoyal = false

# Anti-House
# Hybrid of antichess and zh. Antichess is the base variant.
# Variant defined in Liantichess website. Credits to SriMethan for the definition.
[antihouse:giveaway]
pieceDrops = true
capturesToHand = true
pocketSize = 6
castling = false

# Coffee-Race
# Hybrid of rk and antichess --> SOLVED
# Variant defined in Liantichess website. Credits to SriMethan for the definition.
[coffeerace:racingkings]
mustCapture = true

# Epic Atomic
# Atomic with bigger board size and more pieces.
# Variant defined in Liatomic website. Credits to RaviharaV for the definition.
[epicatomic:atomic]
queen = q
bishop = b
knight = n
rook = r
pawn = p
promotionPieceTypes = b
blastOnCapture = true
castling = false
startFen = rnnbqkbnnr/pppppppppp/10/10/10/10/PPPPPPPPPP/RNNBQKBNNR w KQkq - 0 1
maxRank = 8
maxFile = 10
chess960 = false
promotionRegionWhite = *6 *7 *8 *9 *10
promotionRegionBlack = *5 *4 *3 *2 *1
doubleStep = true
castling = false

# Checkmateless chess
# Checks and checkmates can't be played. You have to get your enemy into a position where they are forced to make an illegal move (moving your king into check, checking, and checkmating your enemy are included as illegal moves) to win the variant.
# https://lichess.org/forum/team-variant-testers/checkmateless-chess
[checkmateless:chess]
checking = false
stalemateValue = loss

# Sixth Rank chess
# Reach the sixth rank to win.
# lichess.org/forum/team-variant-testers/sixth-rank-chess
[sixthrank:chess]
flagPiece = p
flagRegionWhite = *6
flagRegionBlack = *3

# Fullmoon chess
# Variant created by moonbay and inspired in Capablanca and Seirawan
# https://lichess.org/forum/team-variant-testers/fullmoon-chess-variant
[fullmoon:chess]
pieceToCharTable = PNBRQ..AC............Kpnbrq..ac............k
archbishop = a
chancellor = c
startFen = rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR[CAca] w - - 0 1
promotionPieceTypes = qcarbn
pieceDrops = true
whiteDropRegion = *1
blackDropRegion = *8
castling = false
doubleStep = false
stalemateValue = loss

# Crowded Xiangqi
# Chinese Chess on half the board (5 × 9 intersections). Pawns (soldiers) are set to display as archbishops (via pieceToCharTable), so that WinBoard/XBoard won't disappear them on the last rank.
# https://github.com/fairy-stockfish/Fairy-Stockfish/issues/180
[crowdedxiangqi:xiangqi]
pieceToCharTable = .N.R.ABP.K.C...........n.r.abp.k.c..........
maxRank = 5
startFen = rnbakabnr/pcp1p1pcp/9/PCP1P1PCP/RNBAKABNR w - - 0 1
mobilityRegionBlackKing = d3 e3 f3 d4 e4 f4 d5 e5 f5
mobilityRegionBlackFers = d3 e3 f3 d4 e4 f4 d5 e5 f5
mobilityRegionBlackElephant = *1 *2 *3 *4 *5
soldierPromotionRank = 4

# Massacre
# Variant created by Andy Lewicki. Giveaway style but the board is full of pieces. Credits to Mtaktikos for the definition.
# https://brainking.com/en/GameRules?tp=128
[massacre:giveaway]
commoner = -
queen = -
rook = -
bishop = -
knight = -
pawn = -
customPiece1 = q:cQ
customPiece2 = b:cB
customPiece3 = n:cN
customPiece4 = r:cR
startFen = rBbnbqNn/bQrnQRRr/rrqbNqQb/bBNqbNBN/bNRrrrBQ/QRQqRnNB/qBRnnqNQ/BBQnqnRR w - - 0 1
stalemateValue = loss
extinctionValue = loss
extinctionPieceTypes = *
pieceToCharTable = .NBRQ..................nbrq.................

# Backrank
# The objective of the game is to reach the last rank with any of your pieces. Credits to Procyon for the definition
# Variant defined in Pychess discord and previously playable with Chessboi bot.
[backrank:chess]
king = -
commoner = k
castlingKingPiece = k
extinctionValue = loss
extinctionPieceTypes = k
extinctionPseudoRoyal = true
flagPiece = k
promotionPieceTypes = -
promotedPieceType = q:k r:k b:k n:k p:k
mandatoryPiecePromotion = true
flagRegionWhite = *8
flagRegionBlack = *1

# Stardust
# Variant invented by Couch Tomato, spaced-themed and inspired in Star Wars.
# Variant defined in Pychess discord and previously playable with Chessboi bot.
[stardust]
maxRank = 10
maxFile = 9
fers = t
immobile = p
gold = c
customPiece1 = x:mRcW
customPiece2 = d:FvW
customPiece3 = r:mQ2cW
customPiece4 = y:mRcD
customPiece5 = o:WcF
startFen = 3tot3/1p5p1/3XRX3/1d5d1/9/1p1t1t1p1/4d4/9/9/4C4[XXXXYYYYtttttttttd] w - - 0 1
pieceDrops = true
whiteDropRegion = *1 *2 *3 d4 e4 f4 d5 e5 f5 d6 e6 f6 *7 d8 e8 f8 d9 e9 f9 d10 e10 f10
blackDropRegion = a4 b4 c4 g4 h4 i4 a5 b5 c5 g5 h5 i5 a6 b6 c6 g6 h6 i6 a8 b8 c8 g8 h8 i8 a9 b9 c9 g9 h9 i9 a10 b10 c10 g10 h10 i10
castling = false
mobilityRegionWhiteCustomPiece3 = *1 *2 *3 *4 a5 c5 d5 e5 f5 g5 i5 *6 *7 *8 a9 c9 d9 e9 f9 g9 i9 *10
# mobilityRegionBlackCustomPiece3 = b5 b9 h5 h9 
extinctionValue = loss
extinctionPieceTypes = rp
extinctionPseudoRoyal = true
flagPiece = r
flagRegionWhite = e2
nMoveRule = 50
nFoldRule = 3
nFoldValue = draw
stalemateValue = loss

# Cetus
# Variant invented by Couch Tomato, ocean-themed and inspired in whales and other marine mammals.
# Variant defined in Pychess discord and previously playable with Chessboi bot.
[cetus]
maxRank = 9
maxFile = 9
wazir = o
fers = k
customPiece1 = b:mQ3
customPiece2 = n:mF
customPiece3 = p:mW
customPiece4 = h:mB3
customPiece5 = s:mR3
customPiece6 = d:mN
startFen = 9/9/9/1b7/9/9/9/2B6/9[PPNHSDOppnnhhssdo]
pieceDrops = true
extinctionValue = loss
extinctionPieceTypes = b
piecePromotionOnCapture = true
mandatoryPiecePromotion = true
pieceDemotion = true
promotedPieceType = o:k
castling = false
connectN = 5
promotionRegionWhite = *1 *2 *3 *4 *5 *6 *7 *8 *9
promotionRegionBlack = *9 *8 *7 *6 *5 *4 *3 *2 *1

# Chess vs Hoppel-Poppel
# Asymmetrical game, Chess army vs Hoppel Poppel army. Credits to Procyon for the definition.
# Variant defined in Pychess discord and previously playable with Chessboi bot.
[chessvshp:chess]
soldier = s
king = k
bishop = b
knight = n
rook = r
promotionPieceTypes = -
knibis = i
biskni = j
promotionPieceTypes = nbrqij
pieceToCharTable = PNBRQ.......IJ.......Kpnbrq.......ij.......k
startFen = rijqkjir/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1

# Orda vs Empire
# Asymmetrical game, Empire army vs Orda army. Empire (as Black again), no Soldiers, 8 x Imperial Pawns but on the 3rd rank. Empire rules in place. Yurt is a mNcK. Credits to Procyon for the definition.
# Variant defined in Pychess discord and previously playable with Chessboi bot.
[ordavsempire:chess]
centaur = h
knibis = a
kniroo = l
customPiece1 = e:mQcN
customPiece2 = c:mQcB
customPiece3 = t:mQcR
customPiece4 = d:mQcK
customPiece5 = y:mNcK
promotionPieceTypes = qh
startFen = tecdkcet/8/pppppppp/8/8/PPPPPPPP/8/LHAYKAHL w - - 0 1
stalemateValue = loss
nFoldValue = loss
flagPiece = k
flagRegionWhite = *8
flagRegionBlack = *1
flyingGeneral = true
pieceToCharTable = P...Q..AH..ECTDY....LKp...q..ah..ectdy....lk

# Atomic duck chess
# Atomic + duck chess hybrid.
# Playable as a custom variant in chess.com
[atomicduck:atomic]
wallingRule = duck
stalemateValue = win

#https://www.chessvariants.com/diffmove.dir/checkers.html
[forward:chess]
pieceToCharTable = PNBRQGE......S.F..LKpnbrqge......s.f..lk
#pieces move only forward. Not even sideways, so no castling.
castling = false
#I tried to pick letters that would remind people of the full piece.
startFen = lesfgsel/pppppppp/8/8/8/8/PPPPPPPP/LESFGSEL w KQkq - 0 1
lance = l
customPiece1 = g:fFfW
customPiece2 = e:ffNfsN
customPiece3 = s:fB
customPiece4 = f:fBfR
promotedPieceType = l:r e:n s:b f:q g:k
#since the king changes forms, should be an extinction variant
extinctionValue = loss
extinctionPieceTypes = kg
extinctionPseudoRoyal = true

[kono]
maxRank = 5
maxFile = e
customPiece1 = p:mF
startFen = ppppp/p3p/5/P3P/PPPPP w - - 0 1
flagPiece = p
flagRegionWhite = a5 b5 c5 d5 e5 a4 e4
flagRegionBlack = a1 b1 c1 d1 e1 a2 e2
flagPieceCount = 7
flagPieceBlockedWin = true
nFoldRule = 0
nMoveRule = 0

#https://www.chessvariants.com/large.dir/xhess.html
[xhess:chess]
pieceToCharTable = HNBRQ......CI........Khnbrq......ci........k
maxRank = 10
maxFile = j
promotionRegionWhite = *10
promotionPieceTypes = nbrqci
flagPiece = k
flagRegionWhite = *10
flagRegionBlack = *1
pawnTypes = h
cannon = c
customPiece1 = i:NN
customPiece2 = h:mfWcfFfhmnN
startFen = r8r/3nkqn3/hcb1ii1bch/1hhhhhhhh1/10/10/1HHHHHHHH1/HCB1II1BCH/3NKQN3/R8R
#technically not needed because of initial setup
##enPassantRegion = -
##castling = false

#https://boardgamegeek.com/boardgame/32/buffalo-chess
[buffalo]
pieceToCharTable = B...D................Cb...d................c
maxRank = 7
maxFile = k
customPiece1 = b:mfW
customPiece2 = c:K
customPiece3 = d:mQ
startFen = bbbbbbbbbbb/11/11/11/11/3DDCDD3/11 w - - 0 1
flagPiece = b
flagRegionBlack = *1
mobilityRegionWhiteCustomPiece2 = *2 *3 *4 *5 *6
mobilityRegionWhiteCustomPiece3 = *2 *3 *4 *5 *6
stalemateValue = loss

#https://www.zillions-of-games.com/cgi-bin/zilligames/submissions.cgi?do=show;id=1596
[knights-halma]
maxRank = 8
maxFile = h
customPiece1 = n:mN
startFen = 5nnn/5nnn/5nnn/8/8/NNN5/NNN5/NNN5 w
flagPiece = n
flagRegionWhite = f8 g8 h8 f7 g7 h7 g6 g6 h8
flagRegionBlack = a3 b3 c3 a2 b2 c2 a1 b1 c1
flagPieceCount = 9
stalemateValue = loss
nFoldRule = 2
nFoldValue = loss
nMoveRule = 0

#https://www.zillions-of-games.com/cgi-bin/zilligames/submissions.cgi/76202?do=show;id=83
#pawns can be caught in the blast in this one
[allexplodeatomic:nocheckatomic]
pawn = -
customPiece1 = p:fmWfceFifmnD
pawnTypes = p

#https://en.wikipedia.org/wiki/Hexapawn
#black wins
[hexapawn]
maxRank = 3
maxFile = c
startFen = ppp/3/PPP w
flagPiece = p
flagRegionWhite = *3
flagRegionBlack = *1
customPiece1 = p:mfWcfF
stalemateValue = loss

#https://ludii.games/details.php?keyword=1D%20Chess
#white wins
[1d-chess:chess]
maxRank = 1
maxFile = h
customPiece1 = n:D
startFen = KNR2rnk w

#https://ludii.games/details.php?keyword=T%27uk%20T%27uk
#The implementation on Ludii doesn't match the description. Ludii implements a Wazir, while the translated description is of a forwards and backwards (non-capturing) Rook.
#black wins
[tuktuk]
maxRank = 6
maxFile = f
customPiece1 = w:mvR
startFen = wwwwww/6/6/6/6/WWWWWW w
stalemateValue = loss
nFoldRule=0
nMoveRule=0

#https://ludii.games/details.php?keyword=Aralzaa
#possibly missing rules
#draw
[aralzaa]
maxRank = 3
maxFile = c
customPiece1 = n:mN
startFen = nnn/3/NNN w
flagPiece = n
flagRegionWhite = *3
flagRegionBlack = *1
flagPieceCount = 3
nFoldRule=0
nMoveRule=0

#https://ludii.games/variantDetails.php?keyword=Bajr&variant=1036
#Some ludii players speculate that it might be missing rules:
#https://ludii.games/forums/showthread.php?tid=762&highlight=bajr
#https://ludii.games/forums/showthread.php?tid=364&highlight=bajr
#but after looking at the translated description, the answer is, the pieces can't move backwards (they have the 3 moves that advance toward the goal).
#white wins
[bajr]
maxRank = 6
maxFile = f
customPiece1 = p:mfrWmrfF
startFen = 4pp/5p/6/6/P5/PP4 w
flagPiece = p
flagRegionWhite = e6 f6 f5
flagRegionBlack = a1 a2 b1
flagPieceCount = 3
nMoveRule=0

#https://ludii.games/details.php?keyword=Lewthwaite%27s%20Game
#black wins
[lewthwaite]
maxRank = 5
maxFile = e
customPiece1 = w:mW
startFen = wWwWw/WwWwW/wW1Ww/WwWwW/wWwWw w
stalemateValue = loss
nMoveRule = 0

[picaria:tictactoe]
#Known under multiple names but using the name from Wikipedia.
#https://ludii.games/details.php?keyword=Picaria https://en.wikipedia.org/wiki/Picaria
#https://ludii.games/details.php?keyword=Les%20Pendus
#https://ludii.games/details.php?keyword=Wure%20Dune
#https://ludii.games/details.php?keyword=Djara-Badakh
#https://ludii.games/details.php?keyword=Tuk%20Tak
customPiece1 = p:mKmNmAmD
#moves anywhere on the board, KNAD is an list of all possible moves on a 3x3
startFen = 3/3/3[PPPppp] w - - 0 1
mustDrop = true
nMoveRule = 0
nFoldRule = 0

[nineholes:picaria]
#https://ludii.games/details.php?keyword=Nine%20Holes https://en.wikipedia.org/wiki/Nine_Holes
#https://ludii.games/details.php?keyword=San-Noku-Narabe
#https://ludii.games/details.php?keyword=Driesticken
#https://ludii.games/details.php?keyword=Akidada
#https://ludii.games/details.php?keyword=Dris%20at-Talata
connectDiagonal = false

#https://ludii.games/details.php?keyword=Tic-Tac-Chess
[tictacchess:picaria]
startFen = 3/3/3[KQRkqr] w - - 0 1
customPiece1 = k:mKmgQ
customPiece2 = q:mQmgQ
customPiece3 = r:mRmgQ

[asimplegame]
#https://ludii.games/details.php?keyword=A%20Simple%20Game
maxRank = 4
maxFile = d
customPiece1 = p:mW
connectN = 3
startFen = pPpP/4/4/PpPp w - - 0 1
nMoveRule = 0
#according to Jan's own Zillions file, any repetition is a draw
nFoldRule = 2

[alapo:chess]
#https://www.chessvariants.org/small.dir/alapo.html
pieceToCharTable = ..BRQ.........FW.....K..brq.........fw.....k
maxRank = 6
maxFile = f
wazir = w
fers = f
king = -
commoner = k
startFen = rbqqbr/wfkkfw/6/6/WFKKFW/RBQQBR
flagRegionWhite = *6
flagRegionBlack = *1
flagPieceSafe = true
flagMove = true
stalemateValue = loss
nMoveRule = 0
nFoldRule = 0

[rooksquare:chess]
#https://www.chessvariants.com/diffobjective.dir/rooksquare.html
flagRegionWhite = a8 h8
flagRegionBlack = a1 h1

[allqueenschess]
#https://boardgamegeek.com/boardgame/34948/all-queens-chess
maxRank = 5
maxFile = e
startFen = qQqQq/5/Q3q/5/QqQqQ
customPiece1 = q:mQ
connectN = 4
nMoveRule = 0
nFoldRule = 0

#https://www.ludii.games/details.php?keyword=Capture%20the%20Queen
[capturethequeen]
startFen = 3q4/8/8/8/8/8/8/1QQ1QQ2
queen = q
extinctionPieceTypes = q
nFoldRule = 0
#default #nMoveRule = 50
materialCounting = blackdrawodds

#https://www.zillions-of-games.com/cgi-bin/zilligames/submissions.cgi?do=show;id=732
[river:chess]
king = -
commoner = k
castlingKingPiece = k
flagPiece = *
flagRegionWhite = *8
flagRegionBlack = *1

#https://www.zillions-of-games.com/cgi-bin/zilligames/submissions.cgi?do=show;id=237
[cowboys:amazons]
maxRank = 7
maxFile = g
customPiece1 = n:mN
pieceToCharTable = .N.....................n....................
startFen = 2n1n2/7/n5n/7/N5N/7/2N1N2 w - - 0 1

#https://www.zillions-of-games.com/cgi-bin/zilligames/submissions.cgi?do=show;id=1813
[dragon-chess:chess]
customPiece1 = b:BK
customPiece2 = n:NK
customPiece3 = p:KifmnD
customPiece4 = r:RK
castlingRookPieces = r
pawnTypes = p

[annexation:flipello]
maxRank = 10
maxFile = 10
startFen = ***4***/***4***/***4***/10/4pP4/4Pp4/10/***4***/***4***/***4***[PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPpppppppppppppppppppppppppppppp] w 0 1

#https://www.chessvariants.com/shogivariants.dir/cannonshogi.html
[cannonshogi:shogi]
dropNoDoubled = -
shogiPawnDropMateIllegal = false
soldier = p
cannon = u
customPiece1 = a:pR
customPiece2 = c:mBcpB
customPiece3 = i:pB
customPiece4 = w:mRpRFAcpR
customPiece5 = f:mBpBWDcpB
promotedPieceType = u:w a:w c:f i:f
startFen = lnsgkgsnl/1rci1uab1/p1p1p1p1p/9/9/9/P1P1P1P1P/1BAU1ICR1/LNSGKGSNL[-] w 0 1

#https://www.chessvariants.com/difftaking.dir/deadsquare.html
[nuclear:atomic]
#define a piece that looks exactly like a pawn, but is not one. Takes care of major differences:
#1. Pawns can be petrified.
#2. Pawns can be destroyed by explosions.
pawn = -
customPiece1 = p:fmWfceFifmnD
pawnTypes = p
petrifyOnCaptureTypes = pnbrq
enPassantRegion = -

#https://en.wikipedia.org/wiki/Nim
#FSF can be used to analyse Nim. The number of empty squares between the pieces is the number of items in the stack,
#the number in the custom piece is the number of items you can nim. This is the popular 1-3-5-7 stacks layout.
[nim]
maxRank = 9
maxFile = d
#if the Nim variant has special rules, ie.nimming<=3 pieces then:
#customPiece1 = p:mfR3
customPiece1 = p:mfR
startFen = 3p/4/2p1/4/1p2/4/p3/4/PPPP
stalemateValue = loss

#https://www.ludii.games/details.php?keyword=Roll-Ing%20to%20Four
[roll-ing-to-four]
maxRank = 10
maxFile = d
customPiece1 = p:mfFmfW
startFen = 1ppp/4/4/4/1PPP/ppp1/4/4/4/PPP1
connectN = 4

#https://www.ludii.games/details.php?keyword=Quad%20Wrangle
[quadwrangle:ataxx]
#different sources give different info on whether it is a 7x7 or 8x8 board.
#7x7 is below
maxRank = 8
maxFile = 8
startFen = 1PPPPPP1/p6P/p6P/p6P/p6P/p6P/p6P/1pppppp1
customPiece1 = p:mQ
flipEnclosedPieces = quadwrangle
#override rule from ataxx since drops can be done freely
enclosingDrop = none

[quadwrangle7x7:quadwrangle]
maxRank = 7
maxFile = 7
startFen = 1PPPPP1/p5P/p5P/p5P/p5P/p5P/1ppppp1

#https://www.ludii.games/details.php?keyword=Crusade
[crusade:quadwrangle]
startFen = PpPpPpPp/pPpPpPpP/PpPpPpPp/pPpPpPpP/PpPpPpPp/pPpPpPpP/PpPpPpPp/pPpPpPpP
customPiece1 = p:cK
flipEnclosedPieces = ataxx
pieceDrops = false
passOnStalemate = false

#https://www.ludii.games/details.php?keyword=Snort
#also known as Cats & Dogs
[snort:ataxx]
immobile = p
startFen = 8/8/8/8/8/8/8/8
enclosingDrop = snort
flipEnclosedPieces = none
maxRank = 8
maxFile = 8
passOnStalemate = false
stalematePieceCount = false

#https://www.chess.com/variants/blackletter-chess
[blackletter:chess]
pieceToCharTable = PNBRQ.......E...M...HKpnbrq.......e...m...hk
maxRank = 10
maxFile = 9
promotionRegionWhite = *10
promotionRegionBlack = *1
archbishop = e
chancellor = m
centaur = h
startFen = 1ebq1meb1/rn2k2nr/ppppppppp/9/9/9/9/PPPPPPPPP/RN2K2NR/1EBQ1MEB1[HHhh] w KQkq - 0 1
promotionPieceTypes = behmnqr
doubleStepRegionWhite = *3
doubleStepRegionBlack = *8
pieceDrops = true
castlingRank = 2

#https://www.chessvariants.com/winning.dir/castle.html
[castle:chess]
castlingWins = q

#https://github.com/yagu0/vchess/blob/master/client/src/translations/rules/Squatter1/en.pug
[squatter:chess]
flagRegionWhite = *8
flagRegionBlack = *1
flagPieceSafe = true

[opposite-castling:chess]
oppositeCastling = true

# A Kyoto Shogi variant with a left/right theme.
[gethenian]
maxRank = 7
maxFile = 7
king = -
customPiece1 = k:K
customPiece2 = q:mW
customPiece3 = b:lfrbB
customPiece4 = i:rflbB
customPiece5 = r:lrR
customPiece6 = n:hlN
customPiece7 = t:hrN
customPiece8 = m:WfF
customPiece9 = s:FfW
startFen = 2ikb2/2mnm2/7/7/7/2MNM2/2B+KI2[] w - - 0 1
promotionPieceTypes = -
promotedPieceType = k:q b:r i:r n:t m:s
promotionRegionWhite = *1 *2 *3 *4 *5 *6 *7
promotionRegionBlack = *7 *6 *5 *4 *3 *2 *1
mandatoryPiecePromotion = true
pieceDemotion = true
pieceDrops = true
capturesToHand = true
dropPromoted = true
immobilityIllegal = false
extinctionValue = loss
extinctionPieceTypes = kq
extinctionPseudoRoyal = true
stalemateValue = loss

#https://www.chessvariants.com/boardrules.dir/atlantis.html
[atlantis:chess]
wallingRule = edge
#not ready yet. Other wall variants are "move and wall", this is "move or wall".
#need to figure out way to do this ie. write code for:
#wallOrMove = true

#https://www.chessvariants.com/rules/ajax-orthodox-chess
[ajax-orthodox:chess]
pieceToCharTable = PNBRQ.............MKpnbrq.............mk
customPiece1 = r:RmF
customPiece2 = n:NmK
customPiece3 = b:BmW
customPiece1 = m:KAD
promotionPieceTypes = mqnbr
startFen = rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR[MMmm] w KQkq - 0 1
pieceDrops = true
whiteDropRegion = *1
blackDropRegion = *8

#https://www.chessvariants.com/small.dir/petty.html
[petty:chess]
maxRank = 6
maxFile = 5
startFen = qkbnr/ppppp/5/5/PPPPP/QKBNR w - 0 1
castling = false
doubleStep = false
promotionRegionWhite = *6

#https://www.zillions-of-games.com/cgi-bin/zilligames/submissions.cgi?do=show;id=655
[teeko:picaria]
maxRank = 5
maxFile = 5
connectN = 4
connectNxN = 2
customPiece1 = p:mK
startFen = 5/5/5/5/5[PPPPpppp] w - - 0 1

#https://www.chessvariants.com/small.dir/haynie.html
[haynie:chess]
maxRank = 6
maxFile = 6
startFen = rbqkbr/pppppp/6/6/PPPPPP/RBQKBR w KQkq - 0 1
doubleStep = false
promotionPieceTypes = rbq
castlingQueensideFile = c
castlingKingsideFile = e
promotionRegionWhite = *6

#https://www.zillions-of-games.com/cgi-bin/zilligames/submissions.cgi?do=show;id=1367
[la-mancha-squeez:snailtrail]
pieceToCharTable = P.....................p.....................
maxRank = 9
maxFile = 9
startFen = p7P/9/9/9/3p*P3/9/9/9/p7P w 0 1

[la-mancha-duel:la-mancha-squeez]
customPiece1 = p:K

#https://www.chessvariants.com/diffsetup.dir/argess.html
[argess:chess]
pawnTypes = p
customPiece1 = p:mWcF
#yes, black moves first
startFen = rppppnbk/6qb/7n/7p/PPPP3p/RNPP3p/BQNP3p/KBRP3r b 0 1
castling = false
promotionRegionWhite = g8 h8 h7
promotionRegionBlack = a1 a2 b1

#https://www.chessvariants.com/rules/4-kings-quasi-shatranj
[quasi-shatranj:twokings2]
pieceToCharTable = PN....E...G..FZ....IAKpn....e...g..fz....iak
maxRank = 10
maxFile = 10
customPiece1 = a:AD
customPiece2 = e:AF
customPiece3 = f:AW
customPiece4 = i:DF
customPiece5 = z:DW
customPiece6 = g:K
extinctionPieceCount = 3
startFen = kifkaakfik/znegaagenz/pppppppppp/10/10/10/10/PPPPPPPPPP/ZNEGAAGENZ/KIFKAAKFIK w 0 1
promotionRegionWhite = *10
promotionPieceTypes = zangief
doubleStepRegionWhite = *3
doubleStepRegionBlack = *8

#https://www.zillions-of-games.com/cgi-bin/zilligames/submissions.cgi?do=show;id=1723
[symphony:tictactoe]
maxRank = 8
maxFile = 8
connectN = 5
customPiece1 = p:mfsW
nFoldRule = 3
startFen = 8/8/8/8/8/8/8/8[PPPPPPpppppp] w - - 0

#https://www.zillions-of-games.com/cgi-bin/zilligames/submissions.cgi?do=show;id=734
#am calling it cfour-anyside so it's less confusable with roll-ing-to-four
[cfour-anyside:cfour]
maxRank = 7
startFen = 7/7/7/7/7/7/7[PPPPPPPPPPPPPPPPPPPPPPPPPpppppppppppppppppppppppp] w - - 0 1
enclosingDrop = anyside


`