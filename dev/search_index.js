var documenterSearchIndex = {"docs":
[{"location":"backend/#Backend","page":"Backend","title":"Backend","text":"","category":"section"},{"location":"core/#Core","page":"Core","title":"Core","text":"","category":"section"},{"location":"core/","page":"Core","title":"Core","text":"Fermi.GaussianBasis.BasisFunction\nFermi.GaussianBasis.BasisSet","category":"page"},{"location":"core/#Fermi.GaussianBasis.BasisFunction","page":"Core","title":"Fermi.GaussianBasis.BasisFunction","text":"Fermi.GaussianBasis.BasisFunction\n\nObject representing a shell of Gaussian basis functions composed of N primitives: \n\nchi_lm = sum_i^N C_i r^le^-zeta_i r^2 Y_lm(thetaphi)\n\nFields\n\nName Type Description\nl Int32 Angular momentum number (e.g. 0, 1, 2 for S, P, D...)\ncoef Array{Float64,1} Array with coefficients (C_i) for each primitive\nexp Array{Float64,1} Array with exponents (zeta_i) for each primitive\n\nExamples\n\njulia> bf = Fermi.GaussianBasis.BasisFunction(1, [1/√2, 1/√2], [5.0, 1.2])\nP shell with 3 basis built from 2 primitive gaussians\n\nχ₁₋₁ =    0.7071067812⋅Y₁₋₁⋅r¹⋅exp(-5.0⋅r²)\n     +    0.7071067812⋅Y₁₋₁⋅r¹⋅exp(-1.2⋅r²)\n\nχ₁₀  =    0.7071067812⋅Y₁₀⋅r¹⋅exp(-5.0⋅r²)\n     +    0.7071067812⋅Y₁₀⋅r¹⋅exp(-1.2⋅r²)\n\nχ₁₁  =    0.7071067812⋅Y₁₁⋅r¹⋅exp(-5.0⋅r²)\n     +    0.7071067812⋅Y₁₁⋅r¹⋅exp(-1.2⋅r²)\n\n\n\n\n\n","category":"type"},{"location":"core/#Fermi.GaussianBasis.BasisSet","page":"Core","title":"Fermi.GaussianBasis.BasisSet","text":"Fermi.GaussianBasis.BasisSet\n\nObject holding a set of BasisFunction objects associated with each atom in a molecule.\n\nFields\n\nName Type Description\nmolecule Molecule Fermi.Geometry.Molecule object\nbasis_name String String holding the basis set name\nbasis Dict{Atom,Array{BasisFunction,1}} A dictionary that maps Atom objects to an Array of BasisFunction\nnatoms Int32 Number of atoms in the BasisSet\nnbas Int32 Number of basis functions (Note, not equal the number of BasisFunction objects)\nnshells Int32 Number of shells, i.e. BasisFunction objects\nlc_atoms Array{Int32,1} Integer array maping data to libcint\nlc_bas Array{Int32,1} Integer array maping data to libcint\nlc_env Array{Float64,1} Float64 array maping data to libcint\n\nExample\n\nBuild a basis set from default options\n\njulia> bset = Fermi.GaussianBasis.BasisSet()\nsto-3g Basis Set\nNumber of shells: 5\nNumber of basis:  7\n\nO: 1s 2s 1p \nH: 1s \nH: 1s\n\nThe BasisSet object can be accessed as two-dimensional array.\n\njulia> bset[2] # Show all basis for the second atom (H 1s)\n1-element Vector{Fermi.GaussianBasis.BasisFunction}:\n S shell with 1 basis built from 3 primitive gaussians\n\nχ₀₀  =    0.9817067283⋅Y₀₀⋅exp(-3.425250914⋅r²)\n     +    0.9494640079⋅Y₀₀⋅exp(-0.6239137298⋅r²)\n     +    0.2959064597⋅Y₀₀⋅exp(-0.168855404⋅r²)\njulia> bset[1,2] # Show the second basis for the first atom (O 2s)\nS shell with 1 basis built from 3 primitive gaussians\n\nχ₀₀  =    0.8486970052⋅Y₀₀⋅exp(-5.033151319⋅r²)\n     +    1.1352008076⋅Y₀₀⋅exp(-1.169596125⋅r²)\n     +    0.8567529838⋅Y₀₀⋅exp(-0.38038896⋅r²)\n\nYou can also create your own crazy mix!\n\njulia> @molecule {\n    H 0.0 0.0 0.0\n    H 0.0 0.0 0.7\n} \njulia> mol = Fermi.Geometry.Molecule()\n# Lets create an S basis function for H\njulia> s = Fermi.GaussianBasis.BasisFunction(0, [0.5215367271], [0.122])\n# Now a P basis function\njulia> p = Fermi.GaussianBasis.BasisFunction(1, [1.9584045349], [0.727])\n# Now to create the basis set we need a dictionary maping atoms do basis functions\n# Let's fetch the atom list from the molecule object\njulia> Atoms = mol.atoms\n# Now create the desired mapping as a dictionary. We want the first hydrogen\n# to use only the S function, whereas the second will use both S and P\njulia> shells = Dict(\n    Atoms[1] => [s],\n    Atoms[2] => [s,p]\n)\n# Now we can create the basis set!\njulia> Fermi.GaussianBasis.BasisSet(mol, \"My Crazy\", shells)\nMy Crazy Basis Set\nNumber of shells: 3\nNumber of basis:  5\n\nH: 1s \nH: 1s 1p\n\n\n\n\n\n","category":"type"},{"location":"contributing/#Contributing","page":"Contributing","title":"Contributing","text":"","category":"section"},{"location":"methods/#Quantum-Chemistry-Methods","page":"Methods","title":"Quantum Chemistry Methods","text":"","category":"section"},{"location":"methods/","page":"Methods","title":"Methods","text":"Fermi.HartreeFock\nFermi.HartreeFock.RHF","category":"page"},{"location":"methods/#Fermi.HartreeFock","page":"Methods","title":"Fermi.HartreeFock","text":"Fermi.HartreeFock\n\nModule for running Hartree–Fock computations in Fermi.\n\nMethods\n\n> Fermi.HartreeFock.RHF\n\n\n\n\n\n","category":"module"},{"location":"methods/#Fermi.HartreeFock.RHF","page":"Methods","title":"Fermi.HartreeFock.RHF","text":"Fermi.HartreeFock.RHF\n\nWave function object for Restricted Hartree-Fock methods\n\nHigh Level Interface\n\nRun a RHF computation and return the RHF object:\n\njulia> @energy rhf\n\nEquivalent to\n\njulia> Fermi.HartreeFock.RHF()\n\nComputes RHF using information from Fermi.CurrentOptions.\n\nFields\n\nName Description\nmolecule Molecule object\nenergy RHF Energy\nndocc Number of doubly occupied spatial orbitals\nnvir Number of virtual spatial orbitals\norbitals RHF Orbitals object\ne_conv ΔE from the last iteration\nd_conv RMS from the last iteration\n\nRelevant options\n\nThese options can be set with @set <option> <value>\n\nOption What it does Type choices [default]\nscf_alg Picks SCF algorithm Int [1]\nscf_max_rms RMS density convergence criterion Float64 [10^-9]\nscf_max_iter Max number of iterations Int [50]\nscf_e_conv Energy convergence criterion Float64 [10^-10]\nbasis What basis set to use String [\"sto-3g\"]\ndf Whether to use density fitting Bool true [false]\njkfit What aux. basis set to use for JK String [\"auto\"]\ndiis Whether to use DIIS Bool [true] false\noda Whether to use ODA Bool [true] false\noda_cutoff When to turn ODA off (RMS) Float64 [1E-1]\noda_shutoff When to turn ODA off (iter) Int [20]\nscf_guess Which guess density to use String \"core\" [\"gwh\"]\n\nStruct tree\n\nRHF <: AbstractHFWavefunction <: AbstractWavefunction\n\n\n\n\n\n","category":"type"},{"location":"indice/#Index","page":"Index","title":"Index","text":"","category":"section"},{"location":"indice/","page":"Index","title":"Index","text":"Below is the list of types and functions mentioned in the documentation.","category":"page"},{"location":"indice/#Types","page":"Index","title":"Types","text":"","category":"section"},{"location":"indice/","page":"Index","title":"Index","text":"Order = [:type]","category":"page"},{"location":"indice/#Functions","page":"Index","title":"Functions","text":"","category":"section"},{"location":"indice/","page":"Index","title":"Index","text":"Order = [:function]","category":"page"},{"location":"bibliography/#Bibliography","page":"Bibliography","title":"Bibliography","text":"","category":"section"},{"location":"#Fermi.jl","page":"Home","title":"Fermi.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"A Julia module for ab initio quantum chemistry computations.","category":"page"},{"location":"#Installation","page":"Home","title":"Installation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Fermi.jl is a registered Julia package and, as such, it can be obtained using the standard Julia package manager. From the Julia terminal, use the ] to move to the pkg manager","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> # This is the standard Julia terminal, hit ] to go into Pkg\n(@v1.6) pkg> # This is the package manager! Hit back space to leave this mode","category":"page"},{"location":"","page":"Home","title":"Home","text":"Next add Fermi to the current enviroment.","category":"page"},{"location":"","page":"Home","title":"Home","text":"(@v1.6) pkg> add Fermi","category":"page"},{"location":"","page":"Home","title":"Home","text":"All the dependencies are going to be downloaded and installed and the code should be ready to work. To test the package you can run","category":"page"},{"location":"","page":"Home","title":"Home","text":"(@v1.6) pkg> test Fermi","category":"page"},{"location":"#Trouble-shooting","page":"Home","title":"Trouble-shooting","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"The code is built and tested for the latest Julia version on Ubuntu and MacOS. The most fragile step that can lead to problems while building Fermi is the integral library libcint. Namely, libcint must be able to find BLAS in your computer. For Linux, BLAS can be easily installed as","category":"page"},{"location":"","page":"Home","title":"Home","text":"sudo apt-get install libblas-dev liblapack-dev","category":"page"},{"location":"","page":"Home","title":"Home","text":"You might want to check the build.jl file that contains the instructions to fetch and install libcint. This file is in the source code of Fermi. Julia store source codes in the .julia folder. If you used add Fermi to install the package, the source code should be located at .julia/packages/Fermi. Please also refer to the libcint github page for more details on the dependencies there. ","category":"page"},{"location":"#Usage","page":"Home","title":"Usage","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Fermi.jl can be used interactively through the Julia terminal, or you can write a Julia script which will act as the traditional input file present in other quantum chemistry packages. For example, a minimal script to run a RHF computation on a water molecule can be written as","category":"page"},{"location":"","page":"Home","title":"Home","text":"using Fermi\n\n@molecule {\n  O        1.2091536548      1.7664118189     -0.0171613972\n  H        2.1984800075      1.7977100627      0.0121161719\n  H        0.9197881882      2.4580185570      0.6297938830\n}\n\n@set basis sto-3g\n@energy rhf","category":"page"},{"location":"","page":"Home","title":"Home","text":"If you save this file as input.jl, you can run it as a regular script","category":"page"},{"location":"","page":"Home","title":"Home","text":"shell> julia --threads N input.jl","category":"page"},{"location":"","page":"Home","title":"Home","text":"where N is the desired number of threads. Alternatively, you can set export JULIA_NUM_THREADS=N in your path.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Interactevely, the functions calls are all the same. First, you load Fermi in","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> using Fermi","category":"page"},{"location":"","page":"Home","title":"Home","text":"Next you set the desired molecule and the options","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> @molecule {\n  O        1.2091536548      1.7664118189     -0.0171613972\n  H        2.1984800075      1.7977100627      0.0121161719\n  H        0.9197881882      2.4580185570      0.6297938830\n}\njulia> @set {\n    basis cc-pvdz\n    df true\n}","category":"page"},{"location":"","page":"Home","title":"Home","text":"Finally, run the desired energy computations","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> @energy mp2","category":"page"},{"location":"#Available-methods","page":"Home","title":"Available methods","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"The following methods are currently implemented in Fermi","category":"page"},{"location":"","page":"Home","title":"Home","text":"Method Conventional Density-Fitted Single Precision\nRHF ✔️ ✔️ ✖️\nRMP2 ✔️ ✔️ ✔️\nRCCSD ✔️ ✔️ ✔️\nRCCSD(T) ✔️ ✔️ ✔️","category":"page"},{"location":"","page":"Home","title":"Home","text":"Only restricted reference methods are currently supported. However, all methods can be run using density fitting by setting @set df true. Moreover, JKFIT and RIFIT basis can be specified as","category":"page"},{"location":"","page":"Home","title":"Home","text":"@set {\n    jkfit cc-pvqz-jkfit\n    rifit cc-pvqz-rifit\n}","category":"page"},{"location":"","page":"Home","title":"Home","text":"Single precision calculations are also possible using @set precision single.","category":"page"},{"location":"#About","page":"Home","title":"About","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Fermi.jl is developed at the Center for Computational Quantum Chemistry at the University of Georgia under the supervision  of Dr. Justin M. Turney and Prof. Henry F. Schaefer. For any questions, suggestions or if you want to participate in this project, please email Gustavo Aroeira (aroeira at uga.edu).","category":"page"},{"location":"modules/#Modules","page":"Modules","title":"Modules","text":"","category":"section"},{"location":"modules/","page":"Modules","title":"Modules","text":"Fermi has a number of submodules organized for specific tasks. All modules are accessed as Fermi.ModuleName.","category":"page"},{"location":"modules/#Options","page":"Modules","title":"Options","text":"","category":"section"},{"location":"modules/","page":"Modules","title":"Modules","text":"Fermi.Options","category":"page"},{"location":"modules/#Fermi.Options","page":"Modules","title":"Fermi.Options","text":"Fermi.Options\n\nModule to manage options in Fermi. \n\nFunctions\n\nFermi.Options.set(option, value)     Set an <option> to a given <value>\nFermi.Options.get(option)            Return the current value of an <option>\nFermi.Options.reset()                Reset all options to default values\nFermi.Options.reset(option)          Reset a specific <option> to its default value\nFermi.Options.molecule(molstring)    Read in a String for the `molstring` option\n\nAlternatively, at global scope, one can use the corresponding macros that create shortcuts for the commands above\n\nMacros\n\n@set <option> <value>   Set an <option> to a given <value>\n@get <option>           Return the current value of an <option>\n@reset                  Reset all options to default values\n@reset <option>         Reset a specific <option> to its default value\n@molecule               Read in a String for the `molstring` option\n@lookup <string>        Search for keywords containing <string>\n\n\n\n\n\n","category":"module"},{"location":"modules/#Libcint","page":"Modules","title":"Libcint","text":"","category":"section"},{"location":"modules/","page":"Modules","title":"Modules","text":"Fermi.Libcint","category":"page"},{"location":"modules/#Fermi.Libcint","page":"Modules","title":"Fermi.Libcint","text":"Fermi.Libcint\n\nInterface between Fermi and the integral library libcint. This module exposes libcint functions to the Julia interface. \n\n\n\n\n\n","category":"module"},{"location":"modules/#DIIS","page":"Modules","title":"DIIS","text":"","category":"section"},{"location":"modules/","page":"Modules","title":"Modules","text":"Fermi.DIIS","category":"page"},{"location":"modules/#PhysicalConstants","page":"Modules","title":"PhysicalConstants","text":"","category":"section"},{"location":"modules/","page":"Modules","title":"Modules","text":"Fermi.PhysicalConstants","category":"page"},{"location":"modules/#Fermi.PhysicalConstants","page":"Modules","title":"Fermi.PhysicalConstants","text":"Fermi.PhysicalConstants\n\nModule for storing physical constants and conversion factors used in computations.\n\nFunctions:\n\natomic_number   Given an element symbol, return the atomic number.\n\n\n\n\n\n","category":"module"},{"location":"modules/#Geometry","page":"Modules","title":"Geometry","text":"","category":"section"},{"location":"modules/","page":"Modules","title":"Modules","text":"Fermi.Geometry","category":"page"},{"location":"modules/#Fermi.Geometry","page":"Modules","title":"Fermi.Geometry","text":"Fermi.Geometry\n\nModule handling molecule and atoms data\n\nObjects\n\nAtom      Object storing information about an atom\nMolecule  Object storing information about a molecule (group of atoms)\n\n\n\n\n\n","category":"module"},{"location":"modules/#GaussianBasis","page":"Modules","title":"GaussianBasis","text":"","category":"section"},{"location":"modules/","page":"Modules","title":"Modules","text":"Fermi.GaussianBasis","category":"page"},{"location":"modules/#Fermi.GaussianBasis","page":"Modules","title":"Fermi.GaussianBasis","text":"Fermi.GaussianBasis\n\nModule handling basis functions and basis set.\n\n\n\n\n\n","category":"module"},{"location":"modules/#Orbitals","page":"Modules","title":"Orbitals","text":"","category":"section"},{"location":"modules/","page":"Modules","title":"Modules","text":"Fermi.Orbitals","category":"page"},{"location":"modules/#Integrals","page":"Modules","title":"Integrals","text":"","category":"section"},{"location":"modules/","page":"Modules","title":"Modules","text":"Fermi.Integrals","category":"page"},{"location":"modules/#Fermi.Integrals","page":"Modules","title":"Fermi.Integrals","text":"Fermi.Integrals\n\nModule to compute and manage molecular integrals.\n\n\n\n\n\n","category":"module"},{"location":"modules/#HartreeFock","page":"Modules","title":"HartreeFock","text":"","category":"section"},{"location":"modules/","page":"Modules","title":"Modules","text":"Fermi.HartreeFock","category":"page"},{"location":"modules/#MollerPlesset","page":"Modules","title":"MollerPlesset","text":"","category":"section"},{"location":"modules/","page":"Modules","title":"Modules","text":"Fermi.MollerPlesset","category":"page"},{"location":"modules/#Fermi.MollerPlesset","page":"Modules","title":"Fermi.MollerPlesset","text":"Fermi.MøllerPlesset\n\nModule for running Møller–Plesset perturbation theory computations.\n\n\n\n\n\n","category":"module"},{"location":"modules/#CoupledCluster","page":"Modules","title":"CoupledCluster","text":"","category":"section"},{"location":"modules/","page":"Modules","title":"Modules","text":"Fermi.CoupledCluster","category":"page"},{"location":"modules/#Fermi.CoupledCluster","page":"Modules","title":"Fermi.CoupledCluster","text":"Fermi.CoupledCluster\n\nModule for running CoupledCluster computations in Fermi.\n\n\n\n\n\n","category":"module"}]
}
